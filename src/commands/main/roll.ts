import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a Savage Worlds die')
        .addStringOption(option =>
            option.setName('die_type')
                .setDescription('Die size to roll')
                .setRequired(true)
                .addChoices(
                    { name: 'd4', value: 'd4' },
                    { name: 'd6', value: 'd6' },
                    { name: 'd8', value: 'd8' },
                    { name: 'd10', value: 'd10' },
                    { name: 'd12', value: 'd12' },
                    { name: 'd20', value: 'd20' }
                )
        ),
    async execute(interaction: any) {
        const dieType = interaction.options.getString('die_type');
        let response = `Rolling ${dieType}!`;
        if (dieType === 'd20')
        {
            response = 'Um... why are you rolling a d20?';
        }
        await interaction.reply(response);
    }
};