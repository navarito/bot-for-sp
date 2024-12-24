const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   commands.push(command.data.toJSON());
}

console.log('commands :>> ', commands);
const rest = new REST({ version: '9' }).setToken('MTMyMTE1MDY0NjQ0NzExNjM0OA.Gg7xSs.4GR9-RHYc2fLB0-rlQCtSreydkWKh9jgEws450');

(async () => {
   try {
       console.log('Started refreshing application commands.');
       await rest.put(
           Routes.applicationCommands('239848203191582720'),
           { body: commands },
       );
       console.log('Successfully reloaded application commands.');
   } catch (error) {
       console.error(error);
   }
})();