const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const lang = require(`../config/lang/${process.env.DEFAULT_LANGUAGE || 'en'}.js`);

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member, client) {
        const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor('#7C3AED')
            .setTitle(lang.events.guildMemberAdd.embedTitle)
            .setDescription(lang.events.guildMemberAdd.embedDescription)
            .setFooter({ text: lang.events.guildMemberAdd.embedFooter });

        const rulesButton = new ButtonBuilder()
            .setLabel(lang.events.guildMemberAdd.buttonRulesLabel)
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${member.guild.id}/${process.env.RULES_CHANNEL_ID}`);

        const joinButton = new ButtonBuilder()
            .setLabel(lang.events.guildMemberAdd.buttonJoinLabel)
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${member.guild.id}/${process.env.JOIN_CHANNEL_ID}`);

        const row = new ActionRowBuilder().addComponents(rulesButton, joinButton);

        await channel.send({ content: `👋 <@${member.id}>`, embeds: [embed], components: [row] });
    }
};
