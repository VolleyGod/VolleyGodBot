//init
const { Client } = require("discord.js");
const client = new Client();
const fs = require("fs");
const config = require("./config.json");
const snek = require("snekfetch");
//end of init

//list out the code for the last few lines of code can work. and ur bot btw.
const commands = {
    'log': (message) => {
        let logs = fs.readFile(message.guild.name + ".txt",)
        message.reply(`${logs}`)
    },
    'eval': (message) => {
        function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },

}
    


client.on("message", message => {
    if (message.channel === message.guild.defaultChannel) {
    fs.appendFile(message.guild.name + '.txt', message.author.tag + message.createdAt + message.content, "utf8")
    }
})
client.on('ready', () => {
	console.log(`Ready to serve on ${client.guilds.size}, with ${client.users.size}`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(config.prefix)) return;
    if (msg.author.bot) return;
    if (msg.author.id !== client.user.id) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](msg);
});
client.login(config.token);
console.log('If you have complaints email the.only.crimson.noob@gmail.com')