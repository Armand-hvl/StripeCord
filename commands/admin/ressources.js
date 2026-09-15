const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ressources-admin')
		.setDescription("Poste l'embed de présentation du canal ressources générales dans le canal actuel")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#7C3AED')
			.setTitle('📚 Ressources générales')
			.setDescription(
				"Ici, tu retrouveras des ressources utiles pour ta candidature, sans que ce soit spécifique au BUT ou à GEI-Univ."
			)
			.addFields({
				name: '📌 Ce que tu trouveras ici',
				value:
					"Des contenus qui peuvent servir à tous les profils : recherche de stage, conseils pour ton CV, aide à la rédaction de ta lettre de motivation, et plus largement toutes les infos utiles à ta candidature qui ne rentrent pas dans les canaux dédiés au BUT ou à GEI-Univ.",
			})
			.setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

		try {
			const channel = interaction.channel ?? (await interaction.guild.channels.fetch(interaction.channelId));
			await channel.send({ embeds: [embed] });
			await interaction.reply({ content: '✅ Embed ressources envoyé.', ephemeral: true });
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
