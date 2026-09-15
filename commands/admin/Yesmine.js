const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yesmine-admin')
		.setDescription('Poste l\'embed de présentation de Yesmine dans le canal actuel')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(client, interaction) {
		const embed = new EmbedBuilder()
			.setColor('#7C3AED')
			.setTitle('👋 Yesmine — ton mentor GEI-Univ')
			.setDescription(
				"Hello ! Moi c'est Yesmine 👋 Je suis étudiante à CentraleSupélec après une double licence Maths-Physique à Paris-Saclay. Je suis là pour t'accompagner dans ta préparation au concours GEI-UNIV, que ce soit pour des questions d'organisation, de méthodes de travail, de stratégie de préparation ou pour t'aider sur des notions de cours, notamment en maths et en physique. Mon but, c'est de partager avec toi mon expérience et de t'aider à préparer le concours de la manière la plus efficace possible."
			)
			.addFields({
				name: '🎙️ Retrouve-moi en live',
				value: 'Rendez-vous chaque **jeudi soir** en live pour poser tes questions en direct !',
			})
			.setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

		try {
			const channel = interaction.channel ?? (await interaction.guild.channels.fetch(interaction.channelId));
			await channel.send({ embeds: [embed] });
			await interaction.reply({ content: '✅ Embed Yesmine envoyé.', flags: 'Ephemeral' });
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
