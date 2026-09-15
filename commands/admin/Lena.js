const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lena-admin')
		.setDescription('Poste l\'embed de présentation de Léna dans le canal actuel')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(client, interaction) {
		const embed = new EmbedBuilder()
			.setColor('#7C3AED')
			.setTitle('👋 Léna — ton mentor GEI-Univ')
			.setDescription(
				"Hello ! Moi c'est Léna\n" +
				"Je suis en 4ème année à l'école Polytechnique, en école d'application à Sciences Po.\n" +
				"Je suis passée par la licence MPCI à Marseille et j'ai fait les concours GEI-UNIV. Mon objectif est de t'accompagner tout au long de cette année pour que tu réussisses les concours que tu vises ! Organisation, méthode de travail ou notions de cours n'hésites pas à me solliciter !"
			)
			.addFields({
				name: '🎙️ Retrouve-moi en live',
				value: 'Rendez-vous chaque **lundi soir** en live pour poser tes questions en direct !',
			})
			.setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

		try {
			const channel = interaction.channel ?? (await interaction.guild.channels.fetch(interaction.channelId));
			await channel.send({ embeds: [embed] });
			await interaction.reply({ content: '✅ Embed Léna envoyé.', flags: 'Ephemeral' });
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
