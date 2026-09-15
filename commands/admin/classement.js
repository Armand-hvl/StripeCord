const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('classement-admin')
		.setDescription("Poste l'embed de présentation du classement du mois dans le canal actuel")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#7C3AED')
			.setTitle('🏆 Classement du mois')
			.setDescription(
				"Chaque mois, on met en avant les membres qui s'investissent le plus dans la communauté — et on les récompense pour ça."
			)
			.addFields(
				{
					name: '📊 Comment ça marche',
					value:
						"On analyse l'activité sur l'ensemble des canaux d'entraide et de discussion du mois : la régularité de ta participation, la qualité de tes échanges, le fait d'aider les autres à comprendre... mais aussi le fait de poser de bonnes questions et de chercher sincèrement à progresser.\n\n" +
						"Il n'y a pas de différence entre apprendre et faire apprendre : ce qui compte, c'est ton investissement réel dans les échanges.",
				},
				{
					name: '🔄 Mise à jour',
					value:
						"Le classement est **actualisé chaque semaine** pour que tu puisses suivre ta progression en temps réel, mais c'est bien le cumul sur **l'ensemble du mois** qui détermine le classement final et les récompenses.",
				},
				{
					name: '🎁 Les récompenses',
					value:
						"🥇 **1er** — 1 mois offert\n" +
						"🥈 **2ème** — 50% de réduction\n" +
						"🥉 **3ème** — 30% de réduction\n" +
						"🏅 **Du 4ème au 10ème** — 10% de réduction",
				}
			)
			.setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

		try {
			const channel = interaction.channel ?? (await interaction.guild.channels.fetch(interaction.channelId));
			await channel.send({ embeds: [embed] });
			await interaction.reply({ content: '✅ Embed classement envoyé.', ephemeral: true });
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content:
					"❌ Impossible d'envoyer l'embed ici. Vérifie que le rôle du bot a bien les permissions \"Voir le salon\", \"Envoyer des messages\" et \"Intégrer des liens\" dans ce canal.",
				ephemeral: true,
			});
		}
	},
};
