
const Discord = require("discord.js")
const { get } = require('snekfetch');

module.exports.run = async (bot, message, args) => {
  const cat = await get('http://aws.random.cat/meow').catch(() => null);
  if (!cat || !cat.body) return message.reply('There was an error, please try again.');
  return message.channel.send({
      embed:
      {
          footer: { text: `Requested by ${message.author.tag}`, icon_url: message.author.displayAvatarURL },
          image: { url: cat.body.file }
      }
  });
}

module.exports.help = {
  name: "cat"
}
