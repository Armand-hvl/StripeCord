const express = require('express');
const stripe_1 = require('./stripe');
const syncCustomer = require('../functions/syncCustomer');

// Load language file based on environment variable
const lang = require(`../config/lang/${process.env.DEFAULT_LANGUAGE || 'en'}.js`);

/**
 * Stripe webhook server.
 *
 * Instead of waiting for the periodic cron (permsCheck), this listens for Stripe
 * events and reconciles the affected customer immediately via the shared
 * syncCustomer() logic. Started from events/ready.js when SYNC_MODE is
 * "webhook" or "both".
 */

// Subscription / billing events that can change a member's access.
// Anything else is acknowledged with 200 but ignored.
const RELEVANT_EVENTS = new Set([
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'customer.subscription.paused',
    'customer.subscription.resumed',
    'invoice.paid',
    'invoice.payment_succeeded',
    'invoice.payment_failed',
]);

// Debounce per email: Stripe often fires several events in a burst for one
// change (e.g. invoice.paid + subscription.updated). We coalesce them so a
// given customer is only reconciled once per short window.
const DEBOUNCE_MS = 3000;
const pendingSyncs = new Map();

const scheduleSync = (client, customer, ctx) => {
    const key = customer.email;

    if (pendingSyncs.has(key)) {
        clearTimeout(pendingSyncs.get(key));
    }

    const timer = setTimeout(async () => {
        pendingSyncs.delete(key);
        try {
            await syncCustomer(client, customer, ctx);
        } catch (error) {
            console.error(`[Webhook] Error syncing ${customer.email}:`, error);
        }
    }, DEBOUNCE_MS);

    pendingSyncs.set(key, timer);
};

/**
 * Start the Stripe webhook HTTP server.
 * @param {Object} client - Discord client instance (already logged in)
 */
module.exports = function startWebhookServer(client) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('[Webhook] STRIPE_WEBHOOK_SECRET is not set. Webhook server NOT started.');
        console.error('[Webhook] Set SYNC_MODE="cron" or provide the secret. Aborting webhook startup.');
        return;
    }

    const app = express();

    // Lightweight health endpoint (handy for uptime checks / reverse proxies)
    app.get('/health', (_req, res) => res.status(200).send('OK'));

    // Stripe requires the raw, unparsed body to verify the signature.
    app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
        const signature = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe_1.stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        } catch (error) {
            console.error('[Webhook] Signature verification failed:', error.message);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        // Acknowledge Stripe immediately, then process async. Stripe retries on
        // non-2xx, so we must not let role syncing (which can take seconds) hold
        // the response open.
        res.status(200).json({ received: true });

        if (!RELEVANT_EVENTS.has(event.type)) {
            return;
        }

        try {
            await handleEvent(client, event);
        } catch (error) {
            console.error(`[Webhook] Error handling event ${event.type}:`, error);
        }
    });

    const port = process.env.WEBHOOK_PORT || 3000;
    app.listen(port, () => {
        console.log(`[Webhook] Stripe webhook server listening on port ${port} (POST /webhook).`);
    });
};

/**
 * Resolve the affected customer and trigger a single-customer sync.
 */
async function handleEvent(client, event) {
    const object = event.data.object;

    // Resolve the customer email tied to this event
    const email = await stripe_1.getEmailFromEventObject(object);
    if (!email) {
        console.log(`[Webhook] ${event.type}: could not resolve a customer email. Ignoring.`);
        return;
    }

    const database = await client.database;
    const { discordDB } = database;
    const collection = discordDB.collection(process.env.DATABASE_COLLECTION_NAME);

    // Only act on customers already linked in our database (discordId <-> email).
    // Unlinked emails are ignored until the user runs /link, since without a
    // discordId there is no Discord member to grant or remove roles from.
    const customer = await collection.findOne({ email });
    if (!customer) {
        console.log(`[Webhook] ${event.type}: ${email} is not linked in the database. Waiting for /link.`);
        return;
    }

    console.log(`[Webhook] ${event.type} for ${email} -> scheduling sync.`);

    // Optional log to the Discord logs channel for visibility
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const logsChannel = guild?.channels.cache.get(process.env.LOGS_CHANNEL_ID);
    logsChannel?.send(
        lang.functions.webhook.logEventReceived
            .replace('{event_type}', event.type)
            .replace('{email}', email)
    ).catch(() => {});

    scheduleSync(client, customer, { guild, collection });
}
