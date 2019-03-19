
const Discord = require("discord.js")
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

  var channel = message.guild.channels.find(val => val.name === "guild-boss");

  channel.fetchMessages({limit: 50}) //fetch messages to delete
    .then(function (messages) {
      channel.bulkDelete(messages)
        .catch(console.log);
  });

  channel.send("react to this if you wanna participate in guild boss\nonly kill boss when the # emotes matches this thanks")
    .then(function(msg){msg.react(message.guild.emojis.random());});

  for(var i = 1; i < 8+1; i++){
    channel.send(`----- BOSS ${i}`)
      .then(function(msg){msg.react(message.guild.emojis.random());});
  }

  message.channel.send("yes master");

}

module.exports.help = {
  name: "resetboss",
}
