const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(process.env.COMMAND_NAME_RULES || 'regles-admin')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Poste le règlement du serveur."),

    async execute(client, interaction) {
        const embed = new EmbedBuilder()
            .setColor('#7C3AED')
            .setTitle('📜 Règlement ARWAY')
            .setDescription("Ce serveur est un espace d'échange et d'entraide autour de l'orientation, des études et des parcours inspirants. Merci de respecter les règles suivantes afin que cet espace reste bienveillant, utile et agréable pour tous.")
            .addFields(
                {
                    name: '📋 Règles générales',
                    value:
                        '🤝 **Respect absolu** — pas d\'insultes, moqueries, propos discriminatoires ou politiques.\n' +
                        '🚫 **Pas de spam ni pub** — les liens externes sont interdits sauf autorisation de l\'équipe ARWAY.\n' +
                        '💬 **Langage clair et bienveillant** — évite le langage SMS, privilégie les messages constructifs.\n' +
                        '🔒 **Confidentialité** — ne partage jamais de données personnelles (numéro, adresse, etc.).\n' +
                        '🔕 **Mentions @** — évite de ping les mentors ou l\'équipe sans raison.\n' +
                        '❓ **Une question par message** — pour garder les discussions lisibles et faciliter les réponses.'
                },
                {
                    name: '🧭 Esprit ARWAY',
                    value:
                        'Nous croyons à une orientation vécue, concrète et accessible à tous. Chaque parcours compte, chacun avance à son rythme.\n\n' +
                        'Merci de contribuer à ce climat d\'écoute, d\'ouverture et d\'entraide.'
                }
            )
            .setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

        await interaction.reply({ content: '✅ Règlement posté.', flags: "Ephemeral" });
        await interaction.channel.send({ embeds: [embed] });
    }
};
