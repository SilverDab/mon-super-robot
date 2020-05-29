const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const fs = require("fs");
const bdd = require("./bdd.json");
const ytdl = require('ytdl-core');
client.commands = new Discord.Collection();
const { Client, MessageEmbed } = require('discord.js');



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Bot : Ready !');
    console.log(' ');
    client.user.setStatus("online");
    client.user.setActivity("Travailler à Poudlard");

});

client.on('message', message => {

    if(message.content.startsWith(";del")){
        message.delete()
        if(message.member.hasPermission('MANAGE_MESSAGES')){

            let args = message.content.trim().split(/ +/g);

            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                    setTimeout(() => {
                        message.channel.bulkDelete(args[1]);
                    }, 500);

                    setTimeout(() => {
                        message.channel.send(`${args[1]} message suprimé !`);
                    }, 1000);
                   
                    setTimeout(() => {
                        message.channel.bulkDelete(1);
                    }, 3000);
                    console.log(`[${message.author.username}] à suprimé [${args[1]}] message !`);

                }
            }
        }
    }

    if(message.content.startsWith(";sg")){
        message.delete()
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if(message.content.length > 5){
                message_grande_salle = message.content.slice(4);
                console.log(`Message de la grande salle définie à [${message_grande_salle}]`);
                bdd["message-grande-salle"] = message_grande_salle
                Savebdd();

                setTimeout(() => {
                    message.channel.send(`le message : **${bdd["message-grande-salle"]}** à bien été pris en compte !`);
                }, 100);
                setTimeout(() => {
                    message.channel.bulkDelete(1);
                }, 5500);
            }
            else{
                client.channels.cache.get('705865212485435442').send(`**Bravo** à **${bdd["message-grande-salle"]}** pour avoir fini leur jeu en équipe ! (**+ 10 points** :diamonds:)`);
                console.log(`Message de la grande salle envoyé !`);
            }
        }
    }

    if(message.content.startsWith(";points")){
        message.delete()
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            message.channel.send("Bonjour les points on été mise à jour dans <#705864890673528902>");
            console.log(`[${message.author.username}] à mise à jour les points !`);
        }
    }

    if(message.content.startsWith(";devoir")){
        message.delete()
        if(message.member.roles.cache.has('715648147220856833')){
            const args = message.content.slice(prefix.length).split(/ +/);
            if (args[1] === "set1"){
                if(message.content.length > 14){
                    set_matiere = message.content.slice(13);
                    console.log(`Devoir : matiere définie à [${set_matiere}]`);
                    bdd["set_matiere1"] = set_matiere
                    Savebdd();
                }
            }
            if (args[1] === "set2"){
                if(message.content.length > 14){
                    set_matiere = message.content.slice(13);
                    console.log(`Devoir : message définie à [${set_matiere}]`);
                    bdd["set_matiere2"] = set_matiere
                    Savebdd();
                }
            }
            if (args[1] === "set3"){
                if(message.content.length > 14){
                    set_matiere = message.content.slice(13);
                    console.log(`Devoir : date définie à [${set_matiere}]`);
                    bdd["set_matiere3"] = set_matiere
                    Savebdd();
                }
            }
            if (args[1] === "set4"){
                if(message.content.length > 14){
                    set_matiere = message.content.slice(13);
                    console.log(`Devoir : a envoyer ? définie à [${set_matiere}]`);
                    bdd["set_matiere4"] = set_matiere
                    Savebdd();
                }
            }
            if (args[1] === "send"){
                console.log(`Devoir envoyé par ${message.author.username}`);
                let embed = new MessageEmbed()

                .setColor('2873eb')
                .setTitle(`Devoir de **__${bdd["set_matiere1"]}__**`)
                .setDescription(`Devoirs :**${bdd["set_matiere2"]}**\nDate : **${bdd["set_matiere3"]}**\nA envoyer : **${bdd["set_matiere4"]}**`)
                .setFooter('Si vous avez des devoirs à rajouter mentioner un admin. (Developed by : Silver Night#9835)')

                message.channel.send(embed)
                .then((newMessage) => {
                    newMessage.react("✅")
                })  
            }
        }
    }

    /* if(message.content.startsWith("-day")){
        message.delete()
        if(message.member.roles.cache.has('714091430095749130')) {
            message.channel.send(`**Bravo __${message.author.username}__** ! Tu fais gagné à ta maison **1 points** :diamonds: (commande: **-day**)`);
            message.member.roles.remove('714091430095749130');
            client.channels.cache.get('706879587455336448').send(`**${message.author.username} +1** :diamonds:`);
            console.log(`${message.author.username} a fais gagné 1 points à sa maison !`);
        } 
        else{
            message.author.send(`Tu as déjà executé cette commande aujourd'hui :expressionless: !`);
            console.log(`${message.author.username} a éssayé de refaire gagné 1 points à sa maison ! hahaha quel rigolo celui la.`)
        }
    }   */ 

    if(message.content.startsWith(";role")){
        message.delete()
        if(message.member.roles.cache.has('714845495494836326')){
            message.channel.send(`Bonjour nous mettons en place ce channel pour aider ce qui ne comprenne pas !\n**Donc ceux qu'il veulent pouvoir donner de leur temps pour aider les membres du serveur vous pouvez réajire avec 🟧** sinon ignorer ce message.`).then(async message => {
                message.react('🟧');
                //message.react('🟦');
            });
        }
    }

    if(message.content.startsWith("-sondage")){
        message.delete()
        if(message.content.length > 10){
            if(message.member.roles.cache.has('714847367626752083')){
                sondage = message.content.slice(9);
                console.log(`${message.author.username} à fait un sondage !`);
                bdd["sondage1"] = sondage
                Savebdd();

                let embed = new MessageEmbed()
                .setColor('2873eb')
                .setTitle(`Sondage de ${message.author.username}`)
                .setDescription(`Le sondage :\n**${bdd["sondage1"]}**\n\nSi toi aussi tu veux mettre un sondage fais : **-sondage : (ton sondage)**`)
                .setFooter('Developed by : Silver Night#9835')
                message.channel.send(embed)
                .then((newMessage) => {
                    newMessage.react("✅")
                    newMessage.react("⛔")
                })
            }
            else {
                message.author.send('hello !\nSi tu veux faire ce sondage il est possible que sur :\nhttps://discord.gg/Yz6QQKb')
                console.log(`${message.author.username} à recu le message de pub ;)`);
            }

        }
        else {
            message.author.send('Ton sondage est trop court !')
        }
    }

    if(message.content.startsWith("Matière:")){
        message.react('✅');
        console.log(`${message.author.username} à mis des devoirs !`);
    }
    


    if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
            if (!client.commands.has(command)) return;
            message.delete()
            
            
                try {
                    client.commands.get(command).execute(message, args);

                    if(message.content.startsWith(";play")){
                        const ytdl = require('ytdl-core');
                        let embed = new MessageEmbed()
                        .setColor('00FF00')
                        .setTitle(`D'accord ${message.author.username} je mets t'a musique !`)
                        .setDescription(`**Je joue : **${args[0]}\nLa musique à été lancé par : **${message.author.username}**\nSi toi aussi tu veux mettre de la musique fais : **;play (URL youtube)**`)
                        .setFooter('Developed by : Silver Night#9835')
                        message.channel.send(embed)
                    }

                    if(message.content.startsWith(";stop")){
                        const ytdl = require('ytdl-core');
                        let embed = new MessageEmbed()
                        .setColor('DC143C')
                        .setTitle(`D'accord ${message.author.username} j'arrete la musique !`)
                        .setDescription(`La musique vient d'etre arréte par : **${message.author.username}**\nSi toi aussi tu veux arreter une musique fais : **;stop**`)
                        .setFooter('Developed by : Silver Night#9835')
                        message.channel.send(embed)
                        console.log(`La musique à été stopé par ${message.author.username}`)
                    }

                    } 
                    catch (error) {
                    console.error(error);
                    message.reply("Une erreur s'est produite pendant l'exécution de la commande !");
                }

});






 client.on("messageReactionAdd",(reaction, user) => {
    if(user.bot) return;
        if (reaction.emoji.name === "🟧") {
            reaction.message.guild.members.cache.get(user.id).roles.add("715227981831995413");
        }
        else {
            return;
        }
        /* if (reaction.emoji.name === "🟦") return;
            reaction.message.guild.members.cache.get(user.id).roles.add("714260870938755145");
            console.log("quelqu'un à rejoind la chambre 2"); */
});

client.on("messageReactionRemove",(reaction, user) => {
    if(user.bot) return;
        if (reaction.emoji.name === "🟧") {
            reaction.message.guild.members.cache.get(user.id).roles.remove("715227981831995413");
        }
        else {
            return;
        }
        /* if (reaction.emoji.name === "🟦") return;
            reaction.message.guild.members.cache.get(user.id).roles.remove("714260870938755145");
            console.log("quelqu'un à quitté la chambre 2"); */
}); 




function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}

client.login(token);

//   message.author.send('hello !')