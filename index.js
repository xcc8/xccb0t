const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');
const superagent = require("superagent");
const fs = require('fs');
const randomPuppy = require('random-puppy');


const PREFIX = '!';

 
bot.on('ready', () =>{
	console.log('online');
})

bot.on('message', async message=>{
	let args = message.content.substring(PREFIX.length).split(" ");
	bot.user.setActivity('peeing in the shower');

	switch(args[0]){


		case 'help':
			const embed = new Discord.MessageEmbed()
			.setTitle('Help')
			.addField('Info command', '!info')
			.addField('ping', '!ping')
			.addField('message deleter command', '!massdelete <# of messages to delete>')
            .addField('puts a picture of a cute cat', '!cat')
            .addField('meme command', '!meme')
			.addField('Mute command', '!mute <person to mute> <amount of time>')
            .addField('picture of puppy', '!puppy')
            .addField('pic straight from mc subreddit', '!minecraft')
            .addField('get a random image from the subreddit of your choice', '!subreddit <subreddit>')
			.setColor(0x520821)
            .addField('dont include the <>');
			message.channel.send(embed);
		break;
		
		case 'ping':
			message.channel.send('pong!')
		break;

		case 'info':
			message.channel.send('__xccb0t__ - v0.01 *beta*')
		break;
		case 'massdelete':
			var member = message.member;
			if(!member.roles.cache.some(role => role.name === 'Admin')) return message.reply("invalid perms, if you think that this is an error, pleas contact the server admins")
			if(!args[1]) return message.reply('i need a second argument otherwise ill __**die**__')
				message.channel.bulkDelete(args[1]);
		break;
        case 'mute':
        	var member = message.member;
            if(!member.roles.cache.some(role => role.name === 'Admin')) return message.reply("invalid perms, if you think that this is an error, pleas contact the server admins")
			if(!args[1]) return message.reply('i need a second argument otherwise ill __**die**__')
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return message.reply("I CANT FIND THE USER " + person)
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "member");
            let role = message.guild.roles.cache.find(role => role.name === "mute");
    
            if(!role) return message.reply("Couldn't find the mute role.")
 
            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
 
            person.roles.remove(mainrole.id)
            person.roles.add(role.id);
 
 
            message.channel.send(`${person} has now been muted for ${ms(ms(time))} so https://www.youtube.com/watch?v=OLpeX4RRo28`)
 
            setTimeout(function(){
               
                person.roles.add(mainrole.id)
                person.roles.remove(role.id);
                console.log(role.id)
                message.channel.send(`${person} has been unmuted.`)
            }, ms(time));
        
 
 
   
        break;
        case 'cat':
            var msg = await message.channel.send("generating...")
            var {body} = await superagent
            .get('http://aws.random.cat/meow')
            //console.log(body.file)
            if(!{body}) return message.channel.send("i broke try again cuz me dum")
                let cEmbed = new Discord.MessageEmbed()
                .setTitle('here, have some pussy')
                .setColor(0x520821)
                .setImage(body.file);
            message.channel.send(cEmbed)

            msg.delete();

        break;
        case 'meme':
            var msg = await message.channel.send("generating...")
            var {body} = await superagent
            .get('https://meme-api.herokuapp.com/gimme')
            if(!{body}) return message.channel.send("i broke try again cuz me dum")
                let mEmbed = new Discord.MessageEmbed()
                .setTitle('here, have some memes')
                .setColor(0x520821)
                .setImage(body.url);
            message.channel.send(mEmbed)
            msg.delete();

        break;
        case 'puppy':

          randomPuppy()
    .then(url => {
        var pEmbed = new Discord.MessageEmbed()
        .setTitle('puppy')
        .setColor(0x520821)
        .setImage(url);
        message.channel.send(pEmbed)
        console.log(url);
    })
        break;
    
        case 'minecraft':

          randomPuppy('minecraft')
    .then(url => {
        var mcEmbed = new Discord.MessageEmbed()
        .setTitle('minecraft')
        .setColor(0x520821)
        .setImage(url);
        message.channel.send(mcEmbed)
        console.log(url);
    })
        break;
        case 'subreddit':
        if(!args[1]) return message.reply('i need a second argument otherwise ill __**die**__')
        var sub = args[1]
          randomPuppy(sub)
    .then(url => {
        var subEmbed = new Discord.MessageEmbed()
        .setTitle(sub)
        .setColor(0x520821)
        .setImage(url);
        message.channel.send(subEmbed)
        console.log(url);
    })
        break;






//        case 'fixxcc':
//            let roley = message.guild.roles.cache.find(role => role.name === "xcc");
//            message.member.roles.add(roley);
	}
})

bot.login(process.env.BOT_TOKEN);

