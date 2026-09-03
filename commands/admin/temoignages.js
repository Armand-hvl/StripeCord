const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const path = require('node:path');

const TEMOIGNAGES = [
    { name: 'Audrey Delamare', status: 'Admise — HEC Paris', quote: 'Je me suis sentie parfaitement préparée et sereine.', file: 'audrey.png' },
    { name: 'Devanshi J.', status: 'Admitted — HEC Paris', quote: 'Human, strategic, and genuinely helpful.', file: 'devanshi.png' },
    { name: 'Aditi Tiwary', status: 'Candidate — HEC Paris', quote: 'My call with Armand and Jay literally cleared all my doubts.', file: 'aditi.png' },
    { name: 'Anis Samlali', status: 'Admis — ENS Paris-Saclay', quote: 'Cet accompagnement a vraiment fait la différence.', file: 'anis.png' },
    { name: 'Mathilda Hournarette', status: 'Admise — HEC Paris', quote: 'Son soutien constant a été déterminant.', file: 'mathilda.png' },
    { name: 'Davy Ly', status: "Parent d'une lycéenne", quote: "1h avec ARWAY nous a donné deux ans d'avance.", file: 'davy.png' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName(process.env.COMMAND_NAME_TEMOIGNAGES || 'temoignages-admin')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('Poste tous les témoignages dans ce salon.'),

    async execute(client, interaction) {
        await interaction.reply({ content: `✅ Envoi de ${TEMOIGNAGES.length} témoignages...`, flags: 'Ephemeral' });

        for (const t of TEMOIGNAGES) {
            const filePath = path.join(__dirname, '..', '..', 'assets', 'temoignages', t.file);
            const attachment = new AttachmentBuilder(filePath, { name: t.file });

            const embed = new EmbedBuilder()
                .setColor('#7C3AED')
                .setAuthor({ name: t.name, iconURL: `attachment://${t.file}` })
                .setDescription(`*"${t.quote}"*\n\n🎓 ${t.status}`);

            await interaction.channel.send({ embeds: [embed], files: [attachment] });
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }
};
