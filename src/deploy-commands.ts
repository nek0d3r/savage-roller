import { REST, Routes } from "discord.js";
import { config } from "./config";
import { getCommands } from "./get-commands";

const commandCollection = getCommands();
const commands: unknown[] = [];
commandCollection.each((command: any) => commands.push(command.data.toJSON()));

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.DISCORD_TOKEN);

// Deploy commands
(async () => {
    try
    {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data: any = await rest.put(
            Routes.applicationCommands(config.DISCORD_CLIENT_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error)
    {
        console.log(error);
    }
})();