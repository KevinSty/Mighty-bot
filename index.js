const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const popura = require('popura');
//const mal = popura(config.malUsername, config.malPassword);
const nodemailer = require('nodemailer');

//require les fichiers json
const config = require("./json/config.json");
const hug = require("./json/hug.json");
const pat = require("./json/pat.json");
const kiss = require("./json/kiss.json");
const kill = require("./json/kill.json");
const punch = require("./json/punch.json");
const spank = require("./json/spank.json");
const stare = require("./json/stare.json");
const lick = require("./json/lick.json");
const tickle = require("./json/tickle.json");
const bite = require("./json/bite.json");
const hunter = require("./json/hunter.json");
const data = require("./json/data.json");
const dossier = require("./json/dossier.json");


bot.on('ready', function() {
    // bot.user.setAvatar('./avatar.png').catch(console.error);
    bot.user.setActivity('tuer des enfants (' + config.prefix + 'help)').catch(console.error);

})


    .on('message', async message => {

        if(message.content.substring().toLowerCase().includes("first") === true) {message.delete().catch(console.error) }

        let args = message.content.substring().split(" ");

        if(message.content.indexOf(config.prefix) !== 0) return;
        if(message.author.bot) return;

        switch (args[0].toLowerCase()) {

            //envoie un mail contenant dossier.json et data.json
            case config.prefix + "save":

                if (message.author.id === "341378428072624128") {
                    let transporter = nodemailer.createTransport({
                        service: 'Hotmail',
                        auth: {
                            user: process.env.MAIL,
                            pass: process.env.PASSMAIL
                        }
                    });

                    if (args[1] === "dossier") {
                        let mailOptions = {
                            from: process.env.MAIL,
                            to: process.env.MAIL,
                            subject: 'dossier.json',
                            text: JSON.stringify(dossier)
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    } else if (args[1] === "data") {
                        let mailOptions = {
                            from: process.env.MAIL,
                            to: process.env.MAIL,
                            subject: 'data.json',
                            text: JSON.stringify(data)
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    } else { message.channel.send("arguments manquant")}
                } else { message.channel.send("Seul <@341378428072624128> peut faire cette commande")}
                break;

            //indique les différentes commandes
            case config.prefix + "help":

                const HelpEmbed = new Discord.RichEmbed()
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setDescription(
                        "**8ball** : Répond aux questions \n" +
                        "**avatar** : Montre l'avatar \n" +
                        "**bite** : Mord \n" +
                        "**clean** : Efface les 200 derniers messages\n" +
                        "**daily** : Récompense journalière et indique l'argent\n" +
                        "**dossier** : Envoie un dossier random contre 2000 :dollar:\n" +
                        "**fusion** : fusionne 2 mots ou pseudo \n" +
                        "**google** : Donne un lien google vers la recherche \n" +
                        "**hug** : Fais un câlin \n" +
                        "**hunter** : Pierre Papier Ciseaux (rock, paper, scissors) payant \n" +
                        "**kill** : Tue \n" +
                        "**kiss** : Embrasse \n" +
                        "**lick** : Léche \n" +
                        "**pat** : Pat \n" +
                        "**ping** : Indique le ping \n" +
                        "**profil** : Affiche le profil \n" +
                        "**punch** : Tape \n" +
                        "**reverse** : Répéte à l'envers et supprime le message de l'utilisateur \n" +
                        "**roulette** : Choisi quelqu'un de manière random \n" +
                        "**say** : Répéte et supprime le message de l'utilisateur \n" +
                        "**send dossier** : Envoie des dossiers pour la commande dossier \n" +
                        "**sexy** : Donne le classement des personnes sexy \n" +
                        "**spank** : Met une fessée \n" +
                        "**stare** : Observe \n"+
                        "**tickle** : Chatouille \n"+
                        "**tu veux un god ?** : Phrase mythique \n" +
                        "**youtube** : Donne un lien youtube vers la recherche \n")
                    .setColor(0xfe9b14);
                message.author.sendMessage(HelpEmbed);

                break;

            //permet de connaitre son ping
            case config.prefix + "ping":
                message.channel.send("Votre ping est de " + bot.ping + " ms");
                break;

            //répéte ce que l'utilisateur dit et supprime son message
            case config.prefix + "say":
                args.shift();
                if (args.length === 0) {
                    message.delete().catch(console.error);
                    break;
                }
                const sayMessage = args.join(" ");

                message.delete().catch(console.error);
                message.channel.send(sayMessage);

                break;

            //efface les 200 derniers messages
            case config.prefix + "clean":

                if(message.guild.owner.user === message.author) {
                    const fetched = await message.channel.fetchMessages({count: 200});
                    message.channel.bulkDelete(fetched)
                        .catch(error => message.reply(`Erreur lors de la suppression : ${error}`));
                } else {
                    message.channel.send("Tu n'as pas les droits");
                    break;
                }
                const CleanEmbed = new Discord.RichEmbed()
                    .setTitle("La suppression a été effectuée")
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setDescription("suppresssion des 200 derniers messages")
                    .setColor(0xfe9b14);
                message.channel.send(CleanEmbed);

                break;

            //inverse ce que l'utilisateur écrit
            case config.prefix + "reverse":
                args.shift();
                if (args.length < 1) {
                    message.delete().catch(console.error);
                    break;
                }
                const reversed = args.join(' ').split('').reverse().join('');

                message.delete().catch(console.error);
                message.channel.send(reversed);

                break;

            //répond à une question par une réponse random contenue dans reponses
            case config.prefix + "8ball":

                const responses = [
                    'Demande plus tard',
                    'Bientôt',
                    'Oui',
                    'Absoluement',
                    'Jamais',
                    'Peut-être',
                    'Peut-être pas',
                    'Pourquoi poses-tu cette question ?',
                    'Très drôle'
                ];

            function random(array) {
                return array[Math.floor(Math.random() * array.length)];
            }

                if (args.length < 2) {
                    message.reply('Euuuh.... T\'as oublié la question :face_palm:');
                    break;
                }

                let response = random(responses);
                message.reply(response);
                break;

            //affiche l'avatar
            case config.prefix + "avatar":
                if (args.length < 2) {
                    avatar = message.author.avatarURL;
                    name = message.author.username;
                } else if (args.length > 2) {
                    message.reply('Calme toi, un avatar à la fois');
                    break;
                } else {

                    if(args[1].charAt(1) !== "@") {
                        avatar = message.author.avatarURL;
                        name = message.author.username;
                    } else {
                        avatar = message.mentions.users.first().displayAvatarURL;
                        name = message.mentions.users.first().username;
                    }
                }

                const AvatarEmbed = new Discord.RichEmbed()
                    .setTitle(name)
                    .setImage(avatar)
                    .setColor(0xfe9b14);
                message.channel.send(AvatarEmbed);
                break;

            //jeux pierre feuille ciseau
            case config.prefix + "hunter":

                let pari = 0;
                if(!data[message.author.id]) {
                    data[message.author.id] = {
                        money: 0,
                        lastDaily:"Not Collected",
                        nbrDaily:0
                    };
                    fs.writeFile("./json/data.json", JSON.stringify(data));
                }
                if (args.length < 2) {
                    message.reply('T\'as oublié de choisir (rock, paper, scissors)');
                    break;
                }

                if (Number.isInteger(parseInt(args[2]))) {
                    pari = args[2];
                } else {
                    pari = 1
                }

                if(data[message.author.id].money - pari >= 0) {

                    if (args[1].toLowerCase() === "rock") {
                        duelYImg = hunter.pierre;
                        switch (Math.floor((Math.random() * 3) + 1)) {
                            case 1:
                                duelHImg = hunter.ciseaux;
                                duel = "Bravo";
                                break;
                            case 2:
                                duelHImg = hunter.pierre;
                                duel = "Match nul";
                                break;
                            case 3:
                                duelHImg = hunter.papier;
                                duel = "Perdu";
                                break;
                            default:
                                duel = "erreur :kissing:";
                        }
                    } else if (args[1].toLowerCase() === "paper") {
                        duelYImg = hunter.papier;
                        switch (Math.floor((Math.random() * 3) + 1)) {
                            case 1:
                                duelHImg = hunter.ciseaux;
                                duel = "Perdu";
                                break;
                            case 2:
                                duelHImg = hunter.pierre;
                                duel = "Bravo";
                                break;
                            case 3:
                                duelHImg = hunter.papier;
                                duel = "Match nul";
                                break;
                            default:
                                duel = "erreur :kissing:";
                        }
                    } else if (args[1].toLowerCase() === "scissors") {
                        duelYImg = hunter.ciseaux;
                        switch (Math.floor((Math.random() * 3) + 1)) {
                            case 1:
                                duelHImg = hunter.ciseaux;
                                duel = "Match nul";
                                break;
                            case 2:
                                duelHImg = hunter.pierre;
                                duel = "Perdu";
                                break;
                            case 3:
                                duelHImg = hunter.papier;
                                duel = "Bravo";
                                break;
                            default:
                                duel = "erreur :kissing:";
                        }
                    } else {
                        break
                    }

                    const HunterYEmbed = new Discord.RichEmbed()
                        .setTitle("You")
                        .setThumbnail(duelYImg)
                        .setColor(0xfe9b14);
                    const HunterHEmbed = new Discord.RichEmbed()
                        .setTitle("Him")
                        .setThumbnail(duelHImg)
                        .setColor(0xfe9b14);

                    message.channel.send(HunterYEmbed);
                    message.channel.send("Vs");
                    message.channel.send(HunterHEmbed);

                    if (duel === "Bravo") {
                        message.reply("Bravo, tu as gagné " + (2 * pari) + " :dollar:");
                        data[message.author.id].money -= pari;
                        data[message.author.id].money += (2*pari);
                        fs.writeFile("./json/data.json", JSON.stringify(data));
                    } else if (duel === "Match nul") {
                        message.reply("Dommage, tu ne gagnes rien");
                    } else {
                        data[message.author.id].money -= pari;
                        fs.writeFile("./json/data.json", JSON.stringify(data));
                        message.reply("Send nudes et je te laisse gagner")
                    }
                } else {message.reply("T'as pas assez d'argent sale pauvre")}
                break;

            //hug
            case config.prefix + "hug":
                args.shift();
                let linkHug = hug["hug-" + Math.floor(Math.random() * 20)];

                if (args.length < 1) {
                    titleHug = "Mighty-bot hug " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleHug = message.author.username + " hug " + args[0];
                }

                const HugEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleHug)
                    .setImage(linkHug)
                    .setTimestamp();
                message.channel.send(HugEmbed);
                break;

            //kiss
            case config.prefix + "kiss":
                args.shift();
                let linkKiss = kiss["kiss-" + Math.floor(Math.random() * 20)];

                if (args.length < 1) {
                    titleKiss = "Mighty-bot kiss " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleKiss = message.author.username + " kiss " + args[0];
                }

                const KissEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleKiss)
                    .setImage(linkKiss)
                    .setTimestamp();
                message.channel.send(KissEmbed);
                break;

            //pat
            case config.prefix + "pat":
                args.shift();
                let linkPat = pat["pat-" + Math.floor(Math.random() * 20)];

                if (args.length < 1) {
                    titlePat = "Mighty-bot pat " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titlePat = message.author.username + " pat " + args[0];
                }

                const PatEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titlePat)
                    .setImage(linkPat)
                    .setTimestamp();
                message.channel.send(PatEmbed);
                break;

            //punch
            case config.prefix + "punch":
                args.shift();
                let linkPunch = punch["punch-" + Math.floor(Math.random() * 21)];

                if (args.length < 1) {
                    titlePunch = "Mighty-bot punch " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titlePunch = message.author.username + " punch " + args[0];
                }

                const PunchEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titlePunch)
                    .setImage(linkPunch)
                    .setTimestamp();
                message.channel.send(PunchEmbed);
                break;

            //kill
            case config.prefix + "kill":
                args.shift();
                let linkKill = kill["kill-" + Math.floor(Math.random() * 20)];

                if (args.length < 1) {
                    titleKill = "Mighty-bot kill " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleKill = message.author.username + " kill " + args[0];
                }

                const KillEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleKill)
                    .setImage(linkKill)
                    .setTimestamp();
                message.channel.send(KillEmbed);
                break;

            //spank
            case config.prefix + "spank":
                args.shift();
                let linkSpank = spank["spank-" + Math.floor(Math.random() * 11)];

                if (args.length < 1) {
                    titleSpank = "Mighty-bot spank " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleSpank = message.author.username + " spank " + args[0];
                }

                const SpankEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleSpank)
                    .setImage(linkSpank)
                    .setTimestamp();
                message.channel.send(SpankEmbed);
                break;

            //stare
            case config.prefix + "stare":
                args.shift();
                let linkStare = stare["stare-" + Math.floor(Math.random() * 15)];

                if (args.length < 1) {
                    titleStare = "Mighty-bot stare at " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleStare = message.author.username + " stare at " + args[0];
                }

                const StareEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleStare)
                    .setImage(linkStare)
                    .setTimestamp();
                message.channel.send(StareEmbed);
                break;

            //lick
            case config.prefix + "lick":
                args.shift();
                let linkLick = lick["lick-" + Math.floor(Math.random() * 15)];

                if (args.length < 1) {
                    titleLick = "Mighty-bot lick " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleLick = message.author.username + " lick " + args[0];
                }

                const LickEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleLick)
                    .setImage(linkLick)
                    .setTimestamp();
                message.channel.send(LickEmbed);
                break;

            //tickle
            case config.prefix + "tickle":
                args.shift();
                let linkTickle = tickle["tickle-" + Math.floor(Math.random() * 7)];

                if (args.length < 1) {
                    titleTickle = "Mighty-bot tickle " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleTickle = message.author.username + " tickle " + args[0];
                }

                const TickleEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleTickle)
                    .setImage(linkTickle)
                    .setTimestamp();
                message.channel.send(TickleEmbed);
                break;

            //bite
            case config.prefix + "bite":
                args.shift();
                let linkBite = bite["bite-" + Math.floor(Math.random() * 7)];

                if (args.length < 1) {
                    titleBite = "Mighty-bot bite " + message.author.username;
                } else {

                    if(args[0].charAt(1) === "@") {
                        if(args[0].charAt(2) === "!") {
                            id = args[0];
                            id = id.substring(3, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        } else {
                            id = args[0];
                            id = id.substring(2, id.length - 1);
                            args[0] = id;
                            args[0] = bot.users.get(args[0]).username;
                        }
                    }
                    titleBite = message.author.username + " bite " + args[0];
                }

                const BiteEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(titleBite)
                    .setImage(linkBite)
                    .setTimestamp();
                message.channel.send(BiteEmbed);
                break;

            //donne un classement des personnes les plus sexy du serveur (random) avec l'hote du serveur toujours 1er
            case config.prefix + "sexy":

                classement = ["1. " + message.guild.owner.user.tag];
                sexy = [];
                message.guild.members.map(m=>sexy.push(m.user.tag));

                for(i = 1; i < message.guild.members.size ; i++) {
                    p = Math.floor((Math.random() * sexy.length));
                    if (sexy[p] === message.guild.owner.user.tag) {
                        sexy.splice(p, 1);
                        i -=1;
                    } else {
                        classement.push("");
                        classement.push(i+1 + ". " + sexy[p]);
                        sexy.splice(p,1);
                    }
                }

                const ListEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle('Classement des personnes les plus sexy du serveur')
                    .setDescription(classement);
                message.channel.send(ListEmbed);
                break;

            case config.prefix + "tu":
                if (args[1] === "veux") {
                    if (args[2] === "un") {
                        if (args[3] === "god") {
                            if (args[4] === "?") {message.channel.sendFile("https://media.discordapp.net/attachments/425767882094280705/425768058741719052/ori_god.PNG");}
                        }
                    }

                }
                break;

            //fusionne 2 pseudo ou mots
            case config.prefix + "fusion":

                if (args.length < 3){
                    message.channel.send("Les conditions ne sont pas remplies :wink:");
                    break;
                }

                if(args[1].charAt(1) === "@") {
                    if(args[1].charAt(2) === "!") {
                        id = args[1];
                        id = id.substring(3, id.length - 1);
                        args[1] = id;
                        args[1] = bot.users.get(args[1]).username;
                    } else {
                        id = args[1];
                        id = id.substring(2, id.length - 1);
                        args[1] = id;
                        args[1] = bot.users.get(args[1]).username;
                    }
                }
                if(args[2].charAt(1) === "@") {
                    if(args[2].charAt(2) === "!") {
                        id = args[2];
                        id = id.substring(3, id.length - 1);
                        args[2] = id;
                        args[2] = bot.users.get(args[2]).username;
                    } else {
                        id = args[2];
                        id = id.substring(2, id.length - 1);
                        args[2] = id;
                        args[2] = bot.users.get(args[2]).username;
                    }
                }

                txt1 = args[1].substring(0,args[1].length/2);
                txt2 = args[2].substring(args[2].length/2 ,args[2].length);
                txt3 = txt1 + txt2;
                const FusionEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(args[1] + ' + ' + args[2] )
                    .setDescription(txt3)
                    .setThumbnail(bot.user.displayAvatarURL);
                message.channel.send(FusionEmbed);
                break;

            //Récompense journalière et indique l'argent
            case config.prefix + "daily":

                if(!data[message.author.id]) {
                    data[message.author.id] = {
                        money: 0,
                        lastDaily:"Not Collected",
                        nbrDaily:0
                    };
                    fs.writeFile("./json/data.json", JSON.stringify(data));
                }

                if (data[message.author.id].lastDaily !== moment().format('L')) {

                    data[message.author.id] = {
                        money: data[message.author.id].money + 100,
                        lastDaily: moment().format('L'),
                        nbrDaily: data[message.author.id].nbrDaily += 1
                    };
                    fs.writeFile("./json/data.json", JSON.stringify(data));

                    const DailyEmbed = new Discord.RichEmbed()
                        .setColor(0xfe9b14)
                        .setTitle("Récompense journalière")
                        .addField("Tu as " + data[message.author.id].money + " :dollar:","100 :dollar: viennent de t'être crédité")
                        .addBlankField()
                        .addField("Prochaine récompense", moment().endOf('day').fromNow())
                        .setThumbnail(bot.user.displayAvatarURL);

                    message.channel.send(DailyEmbed);
                } else {

                    const DailyEmbed = new Discord.RichEmbed()
                        .setColor(0xfe9b14)
                        .setTitle("Récompense journalière")
                        .addField("Tu as " + data[message.author.id].money + " :dollar:","Tu as déjà récupéré l'argent aujourd'hui")
                        .addBlankField()
                        .addField("Prochaine récompense", moment().endOf('day').fromNow())
                        .setThumbnail(bot.user.displayAvatarURL);

                    message.channel.send(DailyEmbed);

                }
                break;

            //achete de manière random un dossier
            case config.prefix + "dossier":

                if(data[message.author.id].nbrDaily >= 20 ) {
                    if (Object.keys(dossier).length !== 0) {
                        if (data[message.author.id].money >= 2000) {

                            let pvDossier = dossier["dossier-" + Math.floor(Math.random() * Object.keys(dossier).length)];
                            data[message.author.id].money -= 2000;
                            message.author.sendMessage(pvDossier);
                            message.channel.send("Un dossier viens de vous être envoyé, vous avez désormais : " + data[message.author.id].money + " :dollar:");

                        } else {message.channel.send("Tu n'as pas assez d'argent")}
                    } else {message.channel.send("Il n'y a aucun dossier")}
                } else {message.channel.send("Pour pouvoir faire cette commande il faut au moins avoir fait 20 daily, tu as fait " + data[message.author.id].nbrDaily + " daily")}
                break;

            //Envoie des dossiers pour la commande dossier
            case config.prefix + "send":
                if (args[1] === "dossier") {
                    if(args.length > 2) {
                        if (message.guild.owner.user === message.author) {

                            dossier["dossier-" + (Object.keys(dossier).length + 1)] = args[2];
                            fs.writeFile("./json/dossier.json", JSON.stringify(dossier));
                            message.delete().catch(console.error);
                            message.channel.send("Le dossier à été ajouté au serveur");

                        } else {
                            message.delete().catch(console.error);
                            message.channel.send("Tu n'as pas les droits");
                        }
                        break;
                    } else { message.channel.send("les conditions ne sont pas respectées :wink:")}
                }
                break;

            //Affiche l'argent du joueur
            case config.prefix + "profil":

                if (args.length < 2) {

                    if(!data[message.author.id]) {
                        data[message.author.id] = {
                            money: 0,
                            lastDaily:"Not Collected",
                            nbrDaily:0
                        };
                        fs.writeFile("./json/data.json", JSON.stringify(data));
                    }

                    const ProfilEmbed = new Discord.RichEmbed()
                        .setColor(0xfe9b14)
                        .setTitle(message.author.username)
                        .setDescription("Money : " + data[message.author.id].money + " :dollar:")
                        .setThumbnail(message.author.displayAvatarURL);
                    message.channel.send(ProfilEmbed);

                } else if (args.length > 2) {
                    message.reply('Calme toi, un profil à la fois');
                    break;
                } else {

                    if(args[1].charAt(1) !== "@") {
                        if(!data[message.author.id]) {
                            data[message.author.id] = {
                                money: 0,
                                lastDaily:"Not Collected",
                                nbrDaily:0
                            };
                            fs.writeFile("./json/data.json", JSON.stringify(data));
                        }

                        const ProfilEmbed = new Discord.RichEmbed()
                            .setColor(0xfe9b14)
                            .setTitle(message.author.username)
                            .setDescription("Money : " + data[message.author.id].money + " :dollar:")
                            .setThumbnail(message.author.displayAvatarURL);


                        message.channel.send(ProfilEmbed);

                    } else {
                        if(args[1].charAt(2) !== "!") {
                            id = args[1];
                            id = id.substring(3, id.length - 1);
                            if (!data[id]) {
                                data[id] = {
                                    money: 0,
                                    lastDaily: "Not Collected",
                                    nbrDaily: 0
                                };
                                fs.writeFile("./json/data.json", JSON.stringify(data));
                            }

                            const ProfilEmbed = new Discord.RichEmbed()
                                .setColor(0xfe9b14)
                                .setTitle(message.mentions.users.first().username)
                                .setDescription("Money : " + data[id].money + " :dollar:")
                                .setThumbnail(message.mentions.users.first().displayAvatarURL);
                            message.channel.send(ProfilEmbed);
                        } else {
                            id = args[1];
                            id = id.substring(2, id.length - 1);
                            if (!data[id]) {
                                data[id] = {
                                    money: 0,
                                    lastDaily: "Not Collected",
                                    nbrDaily: 0
                                };
                                fs.writeFile("./json/data.json", JSON.stringify(data));
                            }

                            const ProfilEmbed = new Discord.RichEmbed()
                                .setColor(0xfe9b14)
                                .setTitle(message.mentions.users.first().username)
                                .setDescription("Money : " + data[id].money + " :dollar:")
                                .setThumbnail(message.mentions.users.first().displayAvatarURL);
                            message.channel.send(ProfilEmbed);
                        }
                    }
                }
                break;

            //Choisi quelqu'un de manière random
            case config.prefix + "roulette":

                args.shift();
                roulette = [];
                message.guild.members.map(m=>roulette.push(m.user.id));
                rand = Math.floor((Math.random() * roulette.length));

                message.channel.send("La réponse à \"" + args.join(" ") + "\" est : <@" + roulette[rand] + ">");

                break;

            //Envoie un lien youtube vers la recherche
            case config.prefix + "youtube":

                args.shift();
                message.channel.send("https://www.youtube.com/results?search_query=" + args.join("+"));
                break;

            //Envoie un lien google vers la recherche
            case config.prefix + "google":

                args.shift();
                message.channel.send("https://www.google.fr/search?q=" + args.join("+"));
                break;

            //Envoie un lien MyAnimeList vers l'anime recherché
            /*case config.prefix + "anime":

                args.shift();
                args.join(" ");
                anime=[];
                choix=[];

                mal.searchAnimes(args)
                    .then(res => {
                        anime = res.map(a=> [a.title.toLowerCase(),a.episodes, a.score, a.status, a.synopsis, a.image]);
                        console.log(anime);

                        if(anime.length <= 10) {
                            for (i = 1; i <= anime.length; i++) {
                                choix.push(i + '. ' + anime[i-1][0] + '\n');
                            }
                        } else {
                            for (i = 1; i <= 10; i++) {
                                choix.push(i + '. ' + anime[i-1][0]);
                            }
                        }


                        const ChoixAnimeEmbed = new Discord.RichEmbed()
                            .setColor(0xfe9b14)
                            .setTitle("Lequel voulez vous ?")
                            .setDescription(choix)
                            .setThumbnail(bot.user.displayAvatarURL);
                        message.channel.send(ChoixAnimeEmbed);

                        if (Number.isInteger(parseInt(args))) {

                        }


                    })
                    .catch(err => console.log(err));


                const AnimeEmbed = new Discord.RichEmbed()
                    .setColor(0xfe9b14)
                    .setTitle(message.author.username)
                    .setDescription("Money : " + data[message.author.id].money + " :dollar:")
                    .setThumbnail(message.author.displayAvatarURL);
                message.channel.send(AnimeEmbed);
                break;*/

        }
    });


bot.login(process.env.TOKEN);
