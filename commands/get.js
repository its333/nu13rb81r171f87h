
const Discord = require("discord.js")
const randomColor = require('randomcolor'); // import the script
var request = require('request');

module.exports.run = async (bot, message, args) => {

  if(args.length < 1){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "get {name}", true));

    return;
  };

  var arg = args[0];

  request({
    url:     process.env.webURL+'getContent.php',
    qs:    {cname: arg}
  }, function(error, response, body){
    console.log(body);

    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Get", body, true));
  });

}

module.exports.help = {
  name: "get",
  anyone: true,
}
