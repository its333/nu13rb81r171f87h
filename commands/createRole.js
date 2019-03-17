
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return;

  if(args.length < 2){
    message.channel.send("Usage: }makerole color name");
    return;
  };

  let name = args.slice(1).join(" ");

  if(message.guild.roles.find('name',name)){message.reply("role already exist"); return;};

  message.guild.createRole({
    color: args[0],
    name: name,
  })
  .then(role => message.channel.send(`Successfully created role ${role.name} with color ${role.color}`))
  .catch(console.error);
}

module.exports.help = {
  name: "makerole"
}
