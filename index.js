const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const randomColor = require('randomcolor'); // import the script

const Danbooru = require("danbooru");
const booru = new Danbooru();

const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err,files) => {

  if(err) console.log(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js")
  if(jsfiles.length <= 0){
    console.log("no commands");
    return;
  }

  jsfiles.forEach((f,i) => {
    let props = require(`./commands/${f}`);
    console.log(`Loaded ${f}`);
    bot.commands.set(props.help.name,props);
  });


})

function UpdateActivity(){

  setTimeout(function(){
    var d = new Date();
    d.setHours(d.getUTCHours()+8); //offset to china

    var string = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;

    bot.user.setActivity(string, {type: "PLAYING"});
    console.log(`${d.getHours()} ${d.getMinutes()}`);
    if(d.getHours() == 11 && d.getMinutes() == 55){

      var guilds = bot.guilds; //all the server the bot is in
      try {
          guilds.map((guild) => {
            var c = guild.channels.find(ch => ch.name === "general");
            var role = guild.roles.find(r => r.name === "xpevent");

            if(c && role)
            role = role.toString();
            c.send(`${role} XP event in 5 minutes`); //send in channel
          });
      } catch (err) {
          console.log(err);
      }
    }

    UpdateActivity(); //infinite loop
  }, 30000); //half minute

}

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);

  UpdateActivity();
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //console.log(message.cleanContent);

  const characters = {
     "🐸": "misaka_mikoto",
     "🍩": "oshino_shinobu",
     "🍰": "shokuhou_misaki",
     "☕": "Suzushina_Yuriko",
     "super": "kinuhata_saiai",
     "fren/da": "frenda_seivelun",
     "🌭": "index",
     "🍅": "nishikino_maki",
     "🎵": "bang_dream!",
  };

  if(cmd.slice(0,1) != prefix){
    if(message.mentions.users.first() &&
        message.mentions.users.first().id === bot.user.id &&
        message.content.match(/\s.+/)[0].replace(/\s/g,'')
          .toLowerCase() === "goodbot"){ //wtf is this
            message.channel.send("thanks master");
    }else{
        /*pixiv.login('doxanaboh@nextemail.net', 'pixivisfun').then(() => {
          return pixiv.searchIllust("oshino shinobu")
                  .then(json => {
                    console.log(json);
                  }
                )
        });*/
        var charMatch = characters[message.cleanContent];

        if(charMatch != null){

          booru.posts({tags: `rating:safe ${charMatch}`, limit: 500}).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length);
            const post = posts[index];
            // Get post's url and create a filename for it
            //const url = booru.url(post.file_url);
            //console.log(post.file_url+" "+url);
            message.channel.send({
                embed:
                {
                    //footer: { text: `Requested by ${message.author.tag}`, icon_url: message.author.displayAvatarURL },
                    image: { url: post.file_url }
                }
            })
          })

        }
    }

    return;
  } //none prefix commands

  let commandfile = bot.commands.get(cmd.slice(prefix.length)); //find command
  if(commandfile){
    //check channel
    var botChannel = message.guild.channels.find("name","bot")
    var generalChannel = message.guild.channels.find("name","general")
    //if(message.channel != patreonChannel && message.channel != generalChannel) return;

    if(message.member.roles.find('name','wao') || //require premission
      commandfile.help.hasOwnProperty("anyone")){ //anyone can use
        commandfile.run(bot, message, args); //run command
    }else{
      message.reply("no permission");
      return;
    };

  }


});

bot.login(process.env.token); //token
