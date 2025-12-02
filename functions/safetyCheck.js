// Supress Normal Safety Check without New information
const { MessageFlags } = require('discord.js');
/**
 * Safety check function to remove roles from users who have roles but aren't registered in the database
 * This helps prevent unauthorized access by ensuring only users in the database have access roles
 * 
 * @param {Object} client - Discord client instance
 * @param {Object} database - Database connection object
 */
const planConfig = require("../config/plans");

// Load language file based on environment variable
const lang = require(`../config/lang/${process.env.DEFAULT_LANGUAGE || 'en'}.js`);

module.exports = async function safetyCheck(client) {
    // Skip safety check if disabled in environment variables
    if (process.env.SAFETY_CHECK_ENABLED !== 'true') {
        console.log('[Safety Check] Safety check is disabled. Skipping...');
        return;
    }

    console.log('[Safety Check] Starting safety check for unauthorized role holders...');
    
    const database = await client.database;
    const { discordDB } = database;
    const collection = discordDB.collection(process.env.DATABASE_COLLECTION_NAME);
    
    // Get the guild
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) {
        console.error('[Safety Check] Could not find guild');
        return;
    }
    
    // Get all role IDs that should be checked
    const rolesToCheck = [];
    
    // Add all plan-specific roles
    const planRoleIds = Object.values(planConfig.planRoles);
    if (planRoleIds.length > 0) {
        rolesToCheck.push(...planRoleIds);
    } else if (process.env.PAYING_ROLE_ID) {
        // Legacy mode - use the single role defined in .env
        rolesToCheck.push(process.env.PAYING_ROLE_ID);
    }
    
    if (rolesToCheck.length === 0) {
        console.log('[Safety Check] No roles configured to check. Skipping...');
        return;
    }
    
    console.log(`[Safety Check] Checking ${rolesToCheck.length} roles for unauthorized holders.`);
    
    // Track statistics
    let unauthorizedUsers = 0;
    let unauthorizedUsersList = [];

    for (const roleId of rolesToCheck) {
        // Get the role object (with members) from the guild with the given roleId
        const role = guild.roles.cache.get(roleId);
        if (!role) {
            console.log(`[Safety Check] Role not found: ${roleId}`);
            continue;
        }

        // Process only members who have this role
        for (const [memberId, member] of role.members) {
            if (member.user.bot) continue;

            // Check if member is in the database
            const userInDb = await collection.findOne({ discordId: memberId });

            if (!userInDb) {
                // User has roles but is not in the database - unauthorized access
                unauthorizedUsers++;

                unauthorizedUsersList.push({
                    id: memberId,
                    tag: member.user.tag,
                    mention: `<@${memberId}>`
                });

                console.log(`[Safety Check] Unauthorized user detected: ${member.user.tag} (${memberId})`);

                // Remove only the role involved in this iteration
                await member.roles.remove(roleId).catch(error => {
                    console.error(`[Safety Check] Error removing role ${roleId} from ${member.user.tag}:`, error);
                });
            }
        }
    }
    
    // Log the results
    console.log(`[Safety Check] Completed. Found ${unauthorizedUsers} unauthorized role holders.`);
    
    // Send a message to the logs channel
    const logsChannel = guild.channels.cache.get(process.env.LOGS_CHANNEL_ID);
    if (logsChannel && unauthorizedUsers > 0) {
        const message = unauthorizedUsersList.map(user =>
            lang.functions.safetyCheck.logRemovedUser
                .replace('{user_tag}', user.tag)
                .replace('{user_id}', user.id)
                .replace('{user_mention}', user.mention)
        ).join('\n');
        
        const summary = lang.functions.safetyCheck.logSummary.replace('{count}', unauthorizedUsers);
        
        logsChannel.send(`${message}\n\n${summary}`);
    } else if (logsChannel) {
        logsChannel.send({
          content: lang.functions.safetyCheck.logNoUnauthorized,
          flags: MessageFlags.SuppressNotifications
        });
    }
};
