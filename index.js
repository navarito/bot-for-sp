const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

const fs = require('fs');
client.commands = new Collection();

// โหลด commands
fs.readdirSync('./commands').forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
});

// จัดการ interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply('เกิดข้อผิดพลาดในการทำงาน');
    }
});

client.once('ready', () => {
    console.log('Bot พร้อมทำงานแล้ว!');
});

client.login('MTMyMTE1MDY0NjQ0NzExNjM0OA.Gg7xSs.4GR9-RHYc2fLB0-rlQCtSreydkWKh9jgEws450');