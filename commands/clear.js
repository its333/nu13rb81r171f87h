
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

  if(args.length < 1){
    message.channel.send("Usage: }clear amount");
    return;
  };

  const amount = parseInt(args[0]);

  if (!amount || amount < 1) {
    console.log("Invalid amount")
    message.channel.send("Invalid amount")
    return;
  }

  async function clearMessage(amount) {
    message.delete();

    message.channel.fetchMessages({limit: amount}) //fetch messages to delete
      .then(function (messages) {
        message.channel.bulkDelete(messages)
          .catch(console.log);
      });

    message.channel.send(`Successfully clear ${amount} messages`);
  };

  clearMessage(amount);




}

module.exports.help = {
  name: "clear"
}
