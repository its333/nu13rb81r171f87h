
const Discord = require("discord.js")
const { get } = require('snekfetch');

module.exports.run = async (bot, message, args) => {
  const dog = await get('https://dog.ceo/api/breeds/image/random').catch(() => null);
  if (!dog || !dog.body) return message.reply('There was an error, please try again.');
  return message.channel.send({
      embed:
      {
          footer: { text: `Requested by ${message.author.tag}`, icon_url: message.author.displayAvatarURL },
          image: { url: dog.body.message }
      }
  });
}

module.exports.help = {
  name: "dog"
}
