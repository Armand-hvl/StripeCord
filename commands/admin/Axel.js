const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('axel-admin')
		.setDescription('Poste l\'embed de présentation d\'Axel dans le canal actuel')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(client, interaction) {
		const embed = new EmbedBuilder()
			.setColor('#7C3AED')
			.setTitle('✌️ Axel — ton mentor BUT')
			.setDescription(
				"Salut, je m'appelle Axel ✌🏼\n\n" +
				"Après un BUT GMP à l'IUT de Cachan, j'ai intégré Mines Nancy puis emlyon business school 📚\n\n" +
				"Je suis là pour t'accompagner dans ta préparation aux concours, que ce soit pour des questions d'organisation, de méthodes de travail ou de stratégie de préparation 🧮\n\n" +
				"On pourra envisager des sessions de travail, des meetings avec des alumni qui ont suivi le parcours que tu prépares, des coaching pour tes oraux et bien d'autres 🙌🏼\n\n" +
				"Bref, je serais particulièrement à ton écoute pour répondre à tes besoins afin que tu puisses atteindre tes objectifs 🤝"
			)
			.addFields({
				name: '🎙️ Retrouve-moi en live',
				value: 'Rendez-vous chaque **mardi soir** en live pour poser tes questions en direct !',
			})
			.setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

		try {
			const channel = interaction.channel ?? (await interaction.guild.channels.fetch(interaction.channelId));
			await channel.send({ embeds: [embed] });
			await interaction.reply({ content: '✅ Embed Axel envoyé.', flags: 'Ephemeral' });
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
