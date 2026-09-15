const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bienvenue-admin')
		.setDescription("Poste l'embed de présentation de la communauté ARWAY dans le canal actuel")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),

	async execute(client, interaction) {
		const embed = new EmbedBuilder()
			.setColor('#7C3AED')
			.setTitle('👋 Bienvenue dans la communauté ARWAY')
			.setDescription(
				"Bienvenue parmi nous !\n\n" +
				"ARWAY t'accompagne dans ta candidature aux études supérieures, et cette communauté a été pensée pour que tu ne sois jamais seul(e) face à tes choix d'orientation : poser tes questions, échanger avec d'autres candidats qui vivent la même chose que toi, et progresser grâce à ceux qui sont déjà passés par là."
			)
			.addFields(
				{
					name: '🧭 Comment la communauté est organisée',
					value:
						"Le serveur est découpé en trois grandes parties :\n\n" +
						"**Général** — les canaux communs à tout le monde : annonces, entraide générale, classement du mois, ressources générales et les lives.\n\n" +
						"**BUT** — dédiée aux candidats en admissions parallèles depuis un BUT, avec ton mentor Axel, un canal de discussion générale et des canaux par filière (GMP, GEII, MP, autres).\n\n" +
						"**GEI-Univ** — dédiée aux candidats en admissions parallèles depuis l'université, avec tes mentors Léna et Yesmine, un canal de discussion générale et des canaux par matière.",
				},
				{
					name: '💡 Le petit conseil',
					value: "N'hésite surtout pas à participer activement : poser une question, répondre à quelqu'un d'autre, partager ce que tu as appris... c'est ce qui rendra ton passage ici le plus utile, pour toi comme pour les autres.",
				}
			)
			.setFooter({ text: "L'équipe ARWAY — Orientation par ceux qui l'ont vécue." });

		try {
			const channel = interaction.channel ?? (await interaction.guild.channels.fetch(interaction.channelId));
			await channel.send({ embeds: [embed] });
			await interaction.reply({ content: '✅ Embed de bienvenue envoyé.', flags: 'Ephemeral' });
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
