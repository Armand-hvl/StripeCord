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

		await interaction.channel.send({ embeds: [embed] });
		await interaction.reply({ content: '✅ Embed ressources envoyé.', ephemeral: true });
	},
};
