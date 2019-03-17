
const Discord = require("discord.js")
const randomColor = require('randomcolor'); // import the script

module.exports.run = async (bot, message, args) => {

  if(args.length < 0){
    message.channel.send(new Discord.RichEmbed()
    .setColor(randomColor())
    .addField("Usage", "xpevent", true));

    return;
  };

  var arg = args[0];

  var d = new Date();
  d.setHours(d.getUTCHours()+8); //offset to china

  var n = arg ? arg : d.getUTCDay(); //day of week

  var response = "";

  switch(parseInt(n)){
    case 0:
      response = "步行街 Outside Misawa Cram School";
      break;
    case 2:
      response = "出入口街道 Level 45 area";
      break;
    case 4:
      response = "常需台宿舍楼下 Outside the Tokiwadai dorm";
      break;
    case 5:
      response = "娱乐街 Level 50 area";
      break;
    case 6:
      response = "铁桥 Iron Bridge";
      break;
    default:
      response = "there isn't xp event today!"
    }

  message.channel.send(new Discord.RichEmbed()
  .setColor(randomColor())
  .addField("XP Event", `Weekday ${n}: ${response}`, true));

}

module.exports.help = {
  name: "xpevent",
  anyone: true,
}
