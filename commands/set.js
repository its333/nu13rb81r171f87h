
const Discord = require("discord.js")
const randomColor = require('randomcolor'); // import the script
var request = require('request');

module.exports.run = async (bot, message, args) => {

  if(args.length < 2){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "set {name, value}", true));

    return;
  };

  var arg = args[0];
  var arg2 = args[1];

  request.post({
    url:     process.env.webURL+'/setContent.php',
    form:    {cname: arg, cvalue: arg2}
  }, function(error, response, body){
    console.log(body);

    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Set", "successfully set", true));
  });

}

module.exports.help = {
  name: "set",
  anyone: true,
}
