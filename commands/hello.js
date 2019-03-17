
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.channel.send("hi");
}

module.exports.help = {
  name: "hi"
}
