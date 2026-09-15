const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('annonces-admin')
		.setDescription("Poste l'embed de présentation du canal annonces dans le canal actuel")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(client, interaction) {
		const embed = new EmbedBuilder()
			.setColor('#7C3AED')
			.setTitle('📢 Annonces')
			.setDescription(
				"Ce canal, c'est le point de repère pour tout ce qui compte dans la communauté : nouveautés, infos importantes, et bien sûr nos lives."
			)
			.addFields({
				name: '🎙️ Les lives Armand & Jay',
				value:
					"Chaque **dimanche**, Armand et Jay animent un live pour répondre en direct à toutes tes questions d'orientation et de stratégie de candidature.\n\n" +
					"Les annonces des prochains lives (date, heure, thème) seront publiées ici — garde un œil sur ce canal pour ne pas les manquer !",
			})
			.setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

		try {
			const channel = interaction.channel ?? (await interaction.guild.channels.fetch(interaction.channelId));
			await channel.send({ embeds: [embed] });
			await interaction.reply({ content: '✅ Embed annonces envoyé.', flags: 'Ephemeral' });
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content:
					"❌ Impossible d'envoyer l'embed ici. Vérifie que le rôle du bot a bien les permissions \"Voir le salon\", \"Envoyer des messages\" et \"Intégrer des liens\" dans ce canal.",
				flags: 'Ephemeral',
			});
		}
	},
};
