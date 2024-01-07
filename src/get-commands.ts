import fs from 'node:fs';
import path from 'node:path'
import { Collection } from "discord.js";

export function getCommands()
{
    const commands = new Collection();
    // Grab all the command folders from the commands directory you created earlier
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    for (const folder of commandFolders)
    {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(foldersPath, folder);
        console.log(`foldersPath: ${foldersPath}, folder: ${folder}`);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles)
        {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    return commands;
}