const syncCustomer = require('./syncCustomer');

// Hourly, Daily Check to garantee that all users have the correct roles.
// In webhook mode this still runs as an optional safe guard (SYNC_MODE="both"/"cron").
// The per-customer logic lives in syncCustomer.js so cron and the webhook server stay in sync.
module.exports = async function permsCheck(client) {

    const database = await client.database;

    const { discordDB } = database;
    const collection = discordDB.collection(process.env.DATABASE_COLLECTION_NAME);

    const customers = await collection.find({}).toArray();
    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    for (const customer of customers) {
        if (!customer.email) continue;

        // Reuse the shared per-customer reconciliation, passing the already
        // resolved guild + collection so we don't look them up every iteration.
        await syncCustomer(client, customer, { guild, collection });
    }
}
