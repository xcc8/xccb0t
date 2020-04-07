const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');

const token = 'Njk1MjkyNzA5MzIxMDQ4MTY0.XoYL4A.60eUlrBEProOArcc0DSSNOdImA8';

const PREFIX = '!';


bot.on('ready', () =>{
	console.log('online');
})

bot.on('message', message=>{
	let args = message.content.substring(PREFIX.length).split(" ");
	bot.user.setActivity('peeing in the shower');

	switch(args[0]){


		case 'help':
			const embed = new Discord.MessageEmbed()
			.setTitle('Help')
			.addField('Info command', '!info')
			.addField('ping', '!ping')
			.addField('message deleter command', '!massdelete <# of messages to delete>')
			.addField('Mute command', '!mute <person to mute> <amount of time>')
			.setColor(0x520821);
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

	}
})

bot.login(token);

