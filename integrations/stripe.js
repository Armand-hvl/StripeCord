// Stripe SDK initialization
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

// Expose the raw client so the webhook server can verify event signatures
// (stripe.webhooks.constructEvent) without re-initializing the SDK.
exports.stripe = stripe;

// Sleep function
const sleep = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

/**
 * Gets all subscriptions for a given email directly
 * @returns {Promise<Array>} Array of subscriptions
 */
const getSubscriptionsForEmail = async (email) => {

    await sleep(200); // 0.2-second delay

    let matchingCustomers;

    if (email.includes('+')) {
        const endPart = email.split('+')[1];
        
        const customers = await stripe.customers.search({
            query: `email~'${endPart}'`,
            expand: ["data.subscriptions"],
        });
        
        // Filter customers to match the exact email
        matchingCustomers = customers.data.filter((c) => c.email === email);
    } else {
        const customers = await stripe.customers.search({
            query: `email:'${email}'`,
            expand: ["data.subscriptions"],
        });
        
        matchingCustomers = customers.data || [];
    }

    return matchingCustomers
        .map((customer) => customer.subscriptions.data)
        .flat()
        .filter(Boolean);
};
exports.getSubscriptionsForEmail = getSubscriptionsForEmail;

/**
 * Filter the active subscriptions from a list of subscriptions
 */
const findActiveSubscriptions = (subscriptions) => {
    // Build Filter based on CHECK_STATUS
    return subscriptions.filter(sub =>
        process.env.CHECK_STATUS === "active"
            ? sub.status === 'active' || sub.status === 'trialing' || (sub.cancel_at && sub.current_period_end > Date.now() / 1000)
            : sub.status === 'past_due' || sub.status === 'active' || sub.status === 'trialing' || (sub.cancel_at && sub.current_period_end > Date.now() / 1000)
    );
}
exports.findActiveSubscriptions = findActiveSubscriptions;

/**
 * Resolve the customer email associated with an incoming webhook event object.
 *
 * The object can be a subscription, invoice, or customer, depending on the event.
 * We try the inline email fields first, then fall back to retrieving the customer
 * by id. Returns null if no email can be determined (event is then ignored).
 *
 * @param {Object} object - The `event.data.object` from a Stripe webhook event
 * @returns {Promise<string|null>}
 */
const getEmailFromEventObject = async (object) => {
    if (!object) return null;

    // Customer object itself
    if (object.object === 'customer' && object.email) {
        return object.email;
    }

    // Invoice carries the billing email directly
    if (object.customer_email) {
        return object.customer_email;
    }

    // Otherwise look up the customer by id (present on subscriptions/invoices)
    const customerId = typeof object.customer === 'string'
        ? object.customer
        : object.customer?.id;

    if (!customerId) return null;

    try {
        await sleep(200); // 0.2-second delay to respect rate limits
        const customer = await stripe.customers.retrieve(customerId);
        if (customer && !customer.deleted && customer.email) {
            return customer.email;
        }
    } catch (error) {
        console.error('[Webhook] Failed to retrieve customer for event:', error.message);
    }

    return null;
};
exports.getEmailFromEventObject = getEmailFromEventObject;
