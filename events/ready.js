const { Events } = require('discord.js');
const permsCheck = require('../functions/permsCheck');
const safetyCheck = require('../functions/safetyCheck');
const startWebhookServer = require('../integrations/webhookServer');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(_, client) {
        console.log(`Ready! Logged in as ${client.user.tag}.`);

        // SYNC_MODE controls how subscription changes reach Discord roles:
        //   "webhook" -> instant updates via Stripe events only (no periodic cron)
        //   "cron"    -> legacy periodic full check only
        //   "both"    -> webhook for speed + cron as a safe guard (default)
        const syncMode = (process.env.SYNC_MODE || 'cron').toLowerCase();

        // Start the webhook server for instant updates
        if (syncMode === 'webhook' || syncMode === 'both') {
            startWebhookServer(client);
        }

        // Start the periodic cron check (full DB sweep) as the legacy / safe-guard path
        if (syncMode === 'cron' || syncMode === 'both') {
            console.log(`[Interval Checks] Cron sync enabled (every ${process.env.CHECK_HOURS}h).`);
            setInterval(() => {
                console.log("[Interval Checks] Account verifications in progress. . .");

                // Run permissions check to add or remove roles from users in DB
                permsCheck(client);

                // Run safety check to remove unauthorized role holders without DB entry
                safetyCheck(client);

            }, process.env.CHECK_HOURS * 60 * 60 * 1000); // Time in milliseconds for the daily check to run
            // If you want to change the time, you can use this website to convert it: https://www.timecalculator.net/seconds-to-milliseconds
        }

        if (syncMode === 'webhook') {
            console.log('[Interval Checks] Cron sync disabled (SYNC_MODE="webhook"). Relying on Stripe webhooks.');
        }
    },
};
