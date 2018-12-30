const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '&';

var master, target, victim;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	console.log('Master: ' + process.argv[2]);
	console.log('Target: ' + process.argv[3]);

	//console.log(client.users);

	if (process.argv.length < 4)
		throw "wrong parameters";

	master = getUser(process.argv[2]);
	target = getUser(process.argv[3]);

	if (process.argv.length == 5) {
		victim = getUser(process.argv[4]);
		if (victim == null)
			throw "victim not found";
		console.log("victim: " + victim.username);
		client.user.setAvatar(victim.avatarURL)
		  .then(user => console.log(`New avatar set!`))
		  .catch(console.error);
		client.user.setUsername(victim.username);
	}

	if (master == undefined || target == undefined)
		throw "users not found";

	console.log("found");
	master.send("Hello");
});

client.on('message', msg => {
	console.log(msg.author);
	if(msg.author != client.user)
		if(msg.author == master) {
			target.send(msg.content);
		} else if (msg.author == target) {
			master.send(msg.content);
		}
});

client.login('your token here');//TODO: Just do it

function getUser(username) {
	return client.users.find(user => user.username === username);
}
