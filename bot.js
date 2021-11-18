const Discord = require('discord.js');
const os = require('os');
const cfg = require('./config.json');
const settings = {
    prefix: cfg.prefix,
    token: cfg.token
};
const client = new Discord.Client();
const technicalbot = new Discord.Client();
const ms = require('ms');
const DiscordVoice = require("discord-voice");
const Voice = new DiscordVoice(client, cfg.mongodb);
client.discordVoice = Voice;
const prefix = cfg.prefix;
// const discordTTS = require('discord-tts');
const disbut = require('discord-buttons');
// const moment = require('moment');
const moment = require('moment-timezone');
global.mongoose = require('mongoose');
global.Users = require('./models/user');
//const Canvas = require('canvas');
const imgur = require('imgur');
const fs = require('fs');
moment.locale('ru');
// moment.tz("Europe/Moscow");
moment.tz.setDefault("Europe/Moscow");
mongoose.connect(cfg.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('connected',()=>{
    console.log('БД подключена!')
});

client.on('ready', async () => {
    await client.discordVoice.start();
    // let pid = new Users({
    //     userID: 496685402598539264,
    //     guildID: 874388491516121148,
    //     money: 666,
    //     bio: 'Школотан'
    // });
    // pid.save();
    let server = client.guilds.cache.get('874388491516121148');
    let channel = server.channels.cache.get('874707908703711252');
    let message = await channel.messages.fetch('874719917239316510');
//    let message2 = await channel.messages.fetch('874745088968912897');

    console.log('Бот успешно запущен.');
    client.user.setPresence({ status: 'dnd' });
    client.user.setActivity("специально для GOS", { type: "WATCHING" });
    // client.channels.cache.get('874707908703711252').send(emb.setTitle('Статистика').setDescription('Тут будет статистика. Скоро.').setColor('GREEN'));
    async function ed() {
    //const width = 1200;
    //const height = 620;
//
    //const canvas = Canvas.createCanvas(width, height);
    //const context = canvas.getContext("2d");
	//const background = await Canvas.loadImage('./fon.png');
	//context.drawImage(background, 0, 0, canvas.width, canvas.height);
//
    //context.fillStyle = "#fff";
    //context.font = "92px Arial";
    //context.textAlign = "center";
    //context.fillText("Участников: " + server.memberCount, 400, 90);
    //context.fillText("Бустов: " + server.premiumSubscriptionCount || 0, 275, 190);
    //context.fillText(moment(new Date()).format('LT'), 1000, 550);
//
    //Canvas.loadImage(server.iconURL({ dynamic: true })).then((image) => {
    //  context.drawImage(image, 425, 225);
    //  //fs.writeFileSync("./image.png", buffer);
    //});
//
    //const buffer = canvas.toBuffer("image/png");
    //fs.writeFileSync("./stats.png", buffer);
//
    //imgur
    //.uploadFile('./stats.png')
    //.then(async (json) => {
    //  let link = json.link;
    //  
    //const attachment = new Discord.MessageAttachment('./stats.png', 'stats.png'); 
    let lets = await Users.find({ guildID: message.guild.id, messages: { $gte: 0 } });
    lets.sort((a, b) => b.messages - a.messages);
    let embd = new Discord.MessageEmbed();
    embd
    .setTitle(':bar_chart: | Статистика ' + server.name)
//    .setDescription('Обновлено: ' + moment(new Date()).format('MMMM Do YYYY, h:mm:ss a') + ` (<t:${Math.round(new Date().getTime() / 1000)}:D> <t:${Math.round(new Date().getTime() / 1000)}:T>)`)
    .setDescription('Обновлено: ' + ` <t:${Math.round(new Date().getTime() / 1000)}:D> <t:${Math.round(new Date().getTime() / 1000)}:T>`)
    .addField('Владелец', `<@${message.guild.ownerID}>`, true)
    .addField('Количество участников', server.memberCount, true)
    .addField('Количество бустов', server.premiumSubscriptionCount || 0, true)
    .addField('Каналы', `Текстовых: ${server.channels.cache.filter(c => c.type === "text").size} | Голосовых: ${server.channels.cache.filter(c => c.type === "voice").size} | Категорий: ${server.channels.cache.filter(c => c.type === "category").size}`)
//    .addField('Создан', `<t:${moment(server.createdAt).unix()}:R> ${moment(server.createdAt).format('MMMM Do YYYY, h:mm:ss a')} (<t:${moment(server.createdAt).unix()}:D> <t:${moment(server.createdAt).unix()}:T>)`)
    .addField('Создан', `<t:${moment(server.createdAt).unix()}:R> (<t:${moment(server.createdAt).unix()}:D> <t:${moment(server.createdAt).unix()}:T>)`)
    .addField('AFK канал', server.afkChannel || 'Не установлен', true)
    .addField('ID сервера', server.id, true)
    .addField('Самый активный участник', `${client.users.cache.get(lets[0].userID).username}#${client.users.cache.get(lets[0].userID).discriminator}`, true)
    .setThumbnail(server.iconURL({ dynamic: true }))
//    .attachFiles(attachment)
//    .setImage(link)
    // .setImage('')
    .setColor('#36393F');
    // await message.edit(embd, { files: [ attachment ] });
    await message.edit('Статистика сервера ниже', embd)
//    message2.delete()
    // console.log(buffer)
//    })
//    .catch((err) => {
//      console.error(err.message);
//    });
    }
    setInterval(ed, 60000);
    ed();
});
client.on('guildMemberAdd', async member => {
    const emb = new Discord.MessageEmbed();
	const channel = member.guild.channels.cache.find(ch => ch.id === '874388492732493849');

    emb
        .setAuthor('Game Over System', member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setDescription(`
        Приветик, **${member.user.username}**. Ты вступил(а) на сервер: **Game Over Studio** :rocket:
        У нас очень простые правила, так что можно почитать в <#874388492732493849>
        Особенности сервера:
        \`1.\` Самописный бот <@874715807622504458> (это я ^^)
        └Выполняет оптимизацию и т.д
        \`2.\` Куча, просто куча ботов для развлечения!
        \`3.\` Чаты для общения, мемов или же 18+ 0_o
        \`4.\` Вы можете предлагать свои идеи
        └Можете писать в канал <#874388492145283166>, чтобы добавить то, что вы хотите!

        Все сделано ради вашего удобства, мы дорожим каждым!
        Спасибо, что вы с нами!
        `)
        .setColor('#FF5858')
        .setImage('https://images-ext-2.discordapp.net/external/jWN7IhDaoHZZf4ibieyMi2CqrCdBwPQ04OdjKDSvABk/https/media.giphy.com/media/coCk2MIxaIAkP8e8xT/giphy.gif');
    let m = await channel.send(`<@${member.id}>`)
	channel.send(emb);
    m.delete();
});

client.on('message', async message => {
    // if(message.channel.id == '874388493445517315') {
    // let regx = /^((?:https?:)?\/\/)?((?:www|m)\.)? ((?:discord\.gg|discordapp\.com))/g
    // let cdu = message.content.replace(/\s+/g, '');
    // console.log(cdu);
    // }
    client.nodb = (user) => message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`К сожалению **${user.tag}** нету в базе данных. Попробуйте снова.`));
    let kus = ['Прив', 'пр', 'привет', 'ку', 'кусь', 'здарова'];
    if(message.content.toLowerCase().startsWith('Прив') || message.content.toLowerCase().startsWith('пр') || message.content.toLowerCase().startsWith('привет') || message.content.toLowerCase().startsWith('ку') || message.content.toLowerCase().startsWith('кусь') || message.content.toLowerCase().startsWith('здарова')) message.react('875088760725979176');
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
    let dbuser = await Users.findOne({ guildID: message.guild.id, userID: message.author.id });
    if(!dbuser) {
        let bebra = new Users();
        bebra.guildID = message.guild.id;
        bebra.userID = message.author.id;
        bebra.money = 0;
        bebra.bio = 'Биография не указана.';
        bebra._time = 0;
        bebra.save();
        return client.nodb(message.author);
    } else {
        let dengi = Math.floor(Math.random() * 10);
        if(dengi == 0) dengi++;
        let reward = dbuser.money + dengi;
        await Users.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $set: { money: reward } });

    let emb = new Discord.MessageEmbed();
    dbuser.messages++;
    dbuser.save();
    if(command == 'emulatejoin') {
        if(message.author.id == '496685402598539264') {
            client.emit('guildMemberAdd', message.member)
        } else return;
    }
    if(command == 'help') {
        let embdd = new Discord.MessageEmbed();
        if(args[0] == 'help') {
            message.channel.send(
                emb
                    .setTitle('Команда help')
                    .addField('Название', 'help')
                    .addField('Описание', 'Список команд бота')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'say') {
            message.channel.send(
                emb
                    .setTitle('Команда say')
                    .addField('Название', 'say')
                    .addField('Описание', 'Попросить бота сказать что-то')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'botinfo') {
            message.channel.send(
                emb
                    .setTitle('Команда botinfo')
                    .addField('Название', 'botinfo')
                    .addField('Описание', 'Информация о боте')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'ban') {
            message.channel.send(
                emb
                    .setTitle('Команда ban')
                    .addField('Название', 'ban')
                    .addField('Описание', 'Забанить пользователя')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'mute') {
            message.channel.send(
                emb
                    .setTitle('Команда mute')
                    .addField('Название', 'mute')
                    .addField('Описание', 'Замутить пользователя')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'unmute') {
            message.channel.send(
                emb
                    .setTitle('Команда unmute')
                    .addField('Название', 'unmute')
                    .addField('Описание', 'Размутить пользователя')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'work') {
            message.channel.send(
                emb
                    .setTitle('Команда work')
                    .addField('Название', 'work')
                    .addField('Описание', 'Работать и забрать зарплату за два часа')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'setbio') {
            message.channel.send(
                emb
                    .setTitle('Команда setbio')
                    .addField('Название', 'setbio')
                    .addField('Описание', 'Установить биографию')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'profile') {
            message.channel.send(
                emb
                    .setTitle('Команда profile')
                    .addField('Название', 'profile')
                    .addField('Описание', 'Просмотреть профиль')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'pay') {
            message.channel.send(
                emb
                    .setTitle('Команда pay')
                    .addField('Название', 'pay')
                    .addField('Описание', 'Передать коины пользователю')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'shop') {
            message.channel.send(
                emb
                    .setTitle('Команда shop')
                    .addField('Название', 'shop')
                    .addField('Описание', 'Магазин ролей')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'buy') {
            message.channel.send(
                emb
                    .setTitle('Команда buy')
                    .addField('Название', 'buy')
                    .addField('Описание', 'Купить роль из магазина ролей')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'voicetop') {
            message.channel.send(
                emb
                    .setTitle('Команда voicetop')
                    .addField('Название', 'voicetop')
                    .addField('Описание', 'Просмотреть топ по активности в голосовых каналах')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'voicetime') {
            message.channel.send(
                emb
                    .setTitle('Команда voicetime')
                    .addField('Название', 'voicetime')
                    .addField('Описание', 'Просмотреть время в голосовых каналах вас/пользователя')
                    .setColor('RANDOM')
            )
        } else if(args[0] == 'messagetop') {
            message.channel.send(
                emb
                    .setTitle('Команда messagetop')
                    .addField('Название', 'messagetop')
                    .addField('Описание', 'Просмотреть топ по сообщениям')
                    .setColor('RANDOM')
            )
        } else {
            message.channel.send(
                embdd
                    .setTitle(':question: | Список команд')
                    .setDescription('Снизу будут собраны **все** команды бота.')
                    .addField('help', 'Список команд бота', true)
                    .addField('say', 'Попросить бота сказать что-то', true)
                    .addField('botinfo', 'Информация о боте', true)
                    .addField('ban', 'Забанить пользователя', true)
                    .addField('mute', 'Замутить пользователя', true)
                    .addField('unmute', 'Размутить пользователя', true)
                    .addField('work', 'Работать и забрать зарплату за два часа', true)
                    .addField('setbio', 'Установить биографию', true)
                    .addField('profile', 'Просмотреть профиль', true)
                    .addField('pay', 'Передать коины пользователю', true)
                    .addField('shop', 'Магазин ролей', true)
                    .addField('buy', 'Купить роль из магазина ролей', true)
                    .addField('voicetop', 'Просмотреть топ по активности в голосовых каналах', true)
                    .addField('voicetime', 'Просмотреть время в голосовых каналах вас/пользователя', true)
                    .addField('messagetop', 'Просмотреть топ по сообщениям', true)
                    .setColor('RANDOM')
            );
        }
    //    if(args) {
    //        let command = commands[args[0]];
    //        if(!command) {
    //            return message.channel.send(
    //                emb
    //                    .setTitle(':red_circle: | Ошибка!')
    //                    .setDescription(`Команда под названием **${message.content.slice(6)}** не найдена!`)
    //                    .setColor('RED')
    //            );
    //        }
    //    }
    }
    if(command == 'botinfo') {
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        let mb = Math.round(used * 100) / 100;
        message.channel.send(
            emb
                .setTitle(':bar_chart: | Статистика')
                .setColor('GREEN')
                .addField(' ᠌ ᠌ ᠌᠌ ᠌ ᠌ ᠌ ᠌ ᠌ Статистика', ' ᠌ ᠌ ᠌᠌ ᠌ ᠌ ᠌ ᠌ ᠌ **Бота** ᠌ ᠌ ᠌᠌ ᠌ ᠌ ᠌ ᠌ ᠌ ', false)
                .addField('Количество серверов', client.guilds.cache.size, true)
                .addField('Количество каналов', client.channels.cache.size, true)
                .addField('Количество пользователей', client.users.cache.size, true)
                .addField(' ᠌ ᠌ ᠌᠌ ᠌ ᠌ ᠌ ᠌ ᠌ Статистика', ' ᠌ ᠌ ᠌᠌ ᠌ ᠌ ᠌ ᠌ ᠌ **Сервера** ᠌ ᠌ ᠌᠌ ᠌ ᠌ ᠌ ᠌ ᠌ ', false)
                .addField('Использование ОЗУ', mb + ' МБ')
        )
    }
    if(command == 'say') {
        if(args.join(' ').length > 1500) {
            message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription('В аргументах этой может быть до 1500 символов!')
                    .setColor('RED')
            )
        }
        message.channel.send(
            emb
                .setColor('GREEN')
                .setDescription(args.join(' '))
        )
    }
    if(command == 'ban') {
        if(message.member.hasPermission("BAN_MEMBERS")) {
        if(message.guild.me.hasPermission("BAN_MEMBERS")) {
        let reason = args.slice(1).join(" ");
        if(!reason) reason = 'Не указана';
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.members.resolve(user);
          if (member) {
            member
              .ban({
                reason: reason,
              })
              .then(() => {
                message.channel.send(
                    emb
                        .setTitle(':green_circle: | Успешно!')
                        .setDescription('Вы успешно забанили ' + user.tag)
                        .addField('Модератор', message.author.tag)
                        .addField('Пользователь', user.tag)
                        .addField('Причина', reason || 'Не указана')
                    );
              })
              .catch(err => {
                message.channel.send('Произошла неизвестная ошибка.')
                console.error(err);
              });
          } else {
            message.channel.send("Пользователя нет на сервере!");
          }
        } else {
          message.channel.send("Вы не упомянули пользователя!");
        }
    } else {
        message.channel.send(
            emb
                .setTitle(':red_circle: | Ошибка!')
                .setDescription('Для выполнения этой команды мне нужно право \`BAN_MEMBERS\`!')
                .setColor('RED')
        )
    }
    } else {
        message.channel.send(
            emb
                .setTitle(':red_circle: | Ошибка!')
                .setDescription('Для выполнения этой команды вам нужно право \`BAN_MEMBERS\`!')
                .setColor('RED')
        )
    }
    }
    if(command == 'kick') {
        if(message.member.hasPermission("KICK_MEMBERS")) {
        if(message.guild.me.hasPermission("KICK_MEMBERS")) {
        let reason = args.slice(1).join(" ");
        if(!reason) reason = 'Не указана';
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.members.resolve(user);
          if (member) {
            member
              .kick({
                reason
              })
              .then(() => {
                message.channel.send(
                    emb
                        .setTitle(':green_circle: | Успешно!')
                        .setDescription('Вы успешно кикнули ' + user.tag)
                        .addField('Модератор', message.author.tag)
                        .addField('Пользователь', user.tag)
                        .addField('Причина', reason || 'Не указана')
                        .setColor('RED')
                    );
              })
              .catch(err => {
                message.channel.send('Произошла неизвестная ошибка.')
                console.error(err);
              });
          } else {
            message.channel.send("Пользователя нет на сервере!");
          }
        } else {
          message.channel.send("Вы не упомянули пользователя!");
        }
    } else {
        message.channel.send(
            emb
                .setTitle(':red_circle: | Ошибка!')
                .setDescription('Для выполнения этой команды мне нужно право \`KICK_MEMBERS\`!')
                .setColor('RED')
        )
    }
    } else {
        message.channel.send(
            emb
                .setTitle(':red_circle: | Ошибка!')
                .setDescription('Для выполнения этой команды вам нужно право \`KICK_MEMBERS\`!')
                .setColor('RED')
        )
    }
    }
    if(command == 'mute') {
        if(message.member.hasPermission("MANAGE_CHANNELS")) {
        if(message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        let reason = args.slice(1).join(" ");
        if(!reason) reason = 'Не указана';
        const user = message.mentions.users.first();

        message.guild.channels.cache.forEach((channel) => {
			channel.updateOverwrite(user.id, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
				CONNECT: false
			}).catch(() => { 
                message.channel.send('Произошла неизвестная ошибка.');
            });
		});
        message.channel.send(
            emb
            .setTitle(':green_circle: | Успешно!')
            .setDescription('Вы успешно замутили ' + user.tag)
            .addField('Модератор', message.author.tag)
            .addField('Пользователь', user.tag)
            .addField('Причина', reason || 'Не указана')
            .setColor('RED')
        )
    } else {
        message.channel.send(
            emb
                .setTitle(':red_circle: | Ошибка!')
                .setDescription('Для выполнения этой команды мне нужно право \`MANAGE_CHANNELS\`!')
                .setColor('RED')
        )
    }
} else {
    message.channel.send(
        emb
            .setTitle(':red_circle: | Ошибка!')
            .setDescription('Для выполнения этой команды вам нужно право \`MANAGE_CHANNELS\`!')
            .setColor('RED')
    )
}
}
if(command == 'unmute') {
    if(message.member.hasPermission("MANAGE_CHANNELS")) {
    if(message.guild.me.hasPermission("MANAGE_CHANNELS")) {
    const user = message.mentions.users.first();

    message.guild.channels.cache.forEach((channel) => {
        channel.updateOverwrite(user.id, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true,
            CONNECT: true
        }).catch(() => { 
            message.channel.send('Произошла неизвестная ошибка.');
        });
    });
    message.channel.send(
        emb
        .setTitle(':green_circle: | Успешно!')
        .setDescription('Вы успешно размутили ' + user.tag)
        .addField('Модератор', message.author.tag)
        .addField('Пользователь', user.tag)
        .setColor('GREEN')
    )
} else {
    message.channel.send(
        emb
            .setTitle(':red_circle: | Ошибка!')
            .setDescription('Для выполнения этой команды мне нужно право \`MANAGE_CHANNELS\`!')
            .setColor('RED')
    )
}
} else {
message.channel.send(
    emb
        .setTitle(':red_circle: | Ошибка!')
        .setDescription('Для выполнения этой команды вам нужно право \`MANAGE_CHANNELS\`!')
        .setColor('RED')
)
}
}
if(command == 'work') {
    let data = await Users.findOne({ guildID: message.guild.id, userID: message.author.id });
      
    if(data._time !== null && 6000000 - (Date.now() - data._time) > 0) return message.channel.send(`Вы уже взяли свой бонус. Приходите через ${ms(6000000 - (Date.now() - data._time))}`)
    
    let a = new Discord.MessageEmbed()
    .setDescription(`Вы забрали ваш сегодняшний бонус. Вам было выдано \`200\` коинов.`)
    .setColor('GREEN')
    message.channel.send(a);
    let sum = Math.floor(Math.random() * 200) + 30 
    data._time = Date.now(); data.money += parseInt(200); data.save() 
}
let balaliases = ['bal', 'balance', 'balik', 'balan'];
if(command == 'balance') {
    const user = message.mentions.users.first();
    if(!user) {
    message.channel.send(
        emb
            .setTitle(':coin: | Баланс')
            .setDescription(`На вашем счету ${dbuser.money || 0} коинов.`)
            .setColor('GREN')
    )
    } else {
        let tempuser = await Users.findOne({ guildID: message.guild.id, userID: user.id });
        if(!tempuser) {
            new Users({
                userID: user.id,
                guildID: message.guild.id
            })
            return message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription(`Пользователя нет в базе данных.`)
                    .setColor('RED')
            )
        }
        message.channel.send(
            emb
                .setTitle(':coin: | Баланс')
                .setDescription(`На счету ${user.username} ${dbuser.money || 0} коинов.`)
                .setColor('GREN')
        )
    }
}
if(command == 'setbio') {
    dbuser.bio = args.join(' ');
    dbuser.save();
        message.channel.send(
            emb
                .setTitle(':green_circle: | Успешно!')
                .setDescription(`Вы успешно сменили свою биографию на **${args.join(' ')}**!`)
                .setColor('GREN')
        )
}
if(command == 'profile') {
        const user = message.mentions.users.first();
        tempuser = await Users.findOne({ guildID: message.guild.id, userID: message.author.id });
        if(!tempuser) {
            new Users({
                userID: message.author.id,
                guildID: message.guild.id
            })
        }
        bio = tempuser.bio;
        if(!user) {
        message.channel.send(
            emb
                .setTitle(':busts_in_silhouette: | Профиль')
                .addField('Деньги', tempuser.money || 0)
                .addField('Биография', tempuser.bio || 'Не указана')
                .addField('Аккаунт создан', `<t:${moment(message.author.createdAt).unix()}:D>`)
                .setColor('GREN')
        )
        } else {
            tempuser = await Users.findOne({ guildID: message.guild.id, userID: user.id });

            bio = tempuser.bio;
            if(!tempuser) {
                new Users({
                    userID: user.id,
                    guildID: message.guild.id
                })
            }
            message.channel.send(
                emb
                    .setTitle(':busts_in_silhouette: | Профиль')
                    .addField('Деньги', tempuser.money)
                    .addField('Биография', tempuser.bio)
                    .addField('Аккаунт создан', `<t:${moment(user.createdAt).unix()}:D>`)
                    .setColor('GREN')
            )
        }
}
if(command == 'pay') {
    let member = message.guild.member(message.mentions.users.first())
    if(!member) return message.reply(`Пользователь не был найден.`)
    if(!args[1]) return message.reply(`Укажите количество коинов которые хотите перевести пользователю.`)
    if(args[1] < 1) return message.reply(`Нельзя передать такое количество коинов`)
    if(isNaN(args[1])) return message.reply(`Укажите корректное значение.`)

    let author = await Users.findOne({ guildID: message.guild.id, userID: message.author.id });
    let loc = await Users.findOne({ guildID: message.guild.id, userID: member.id });
    if(!loc) {
        let bebra = new Users();
        bebra.guildID = message.guild.id;
        bebra.userID = member.id;
        bebra.money = 0;
        bebra.bio = 'Биография не указана.';
        bebra._time = 0;
        bebra.save();
        return client.nodb(member.user)
    }

    if(author.money < args[1]) return message.reply(`У вас нету такого количества коинов.`)
    if(author.userID == member.id) return message.reply(`Вы не можете передать коины самому себе!`)
    if(member.user.bot) return message.reply(`Ботам нельзя передать коины!`)

    let embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`**${message.author.username}** успешно передал(а) **${member.user.username}** коины в количестве **${args[1]}** единиц.`)
    author.money -= Math.floor(parseInt(args[1]));
    loc.money += Math.floor(parseInt(args[1]));
    author.save(); loc.save()
    message.channel.send(embed)
}
if(command == 'shop') {
    message.channel.send(
        emb
            .setTitle(':coin: | Магазин')
            .setDescription('**`1.`** Роль `〔🔒〕Vip`, цена `1000` коинов\n**`2.`** Роль `〔🔱〕Master`, цена `3000` коинов\n**`3.`** Роль `〔🌟〕Elite`, цена `3900` коинов\n**`4.`** Роль `〔🌍〕Empire Squad`, цена `4050` коинов\n**`5.`** Роль `〔🚀〕Premium`, цена `5000` коинов\n**`6.`** Роль `〔✨〕MVP`, цена `8000` коинов')
            .addField('Как купить роль?', 'Чтобы купить роль используйте команду `buy <номер роли>`. Аргументы вводить без <>.')
            .setColor('GREEN')
    )
}
if(command == 'buy') {
    if(args[0] == '1') {
        if(dbuser.money < 1000) {
            return message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription('Недостаточно коинов! Для покупки этой роли нужно **1000** коинов!')
            )
        }
        dbuser.money -= 1000;
        dbuser.save();
        const server = client.guilds.cache.get(message.guild.id);
        var role = "874388491516121156";
        message.member.roles.add(role).catch(() => { console.error });
        message.channel.send(
            emb
                .setTitle(':green_circle: | Успешно!')
                .setDescription('Вы успешно купили роль.')
                .setColor('GREEN')
        )
    } else if(args[0] == '2') {
        if(dbuser.money < 3000) {
            return message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription('Недостаточно коинов! Для покупки этой роли нужно **3000** коинов!')
            )
        }
        dbuser.money -= 3000;
        dbuser.save();
        const server = client.guilds.cache.get(message.guild.id);
        var role = "874388491541299254";
        let r = server.roles.cache.get(role);
        message.member.roles.add(role).catch(() => { console.error });
        message.channel.send(
            emb
                .setTitle(':green_circle: | Успешно!')
                .setDescription('Вы успешно купили роль.')
                .setColor('GREEN')
        )
    } else if(args[0] == '3') {
        if(dbuser.money < 3900) {
            return message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription('Недостаточно коинов! Для покупки этой роли нужно **3900** коинов!')
            )
        }
        dbuser.money -= 3900;
        dbuser.save();
        const server = client.guilds.cache.get(message.guild.id);
        var role = "874388491541299256";
        message.member.roles.add(role).catch(() => { console.error });
        message.channel.send(
            emb
                .setTitle(':green_circle: | Успешно!')
                .setDescription('Вы успешно купили роль.')
                .setColor('GREEN')
        )
    } else if(args[0] == '4') {
        if(dbuser.money < 4050) {
            return message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription('Недостаточно коинов! Для покупки этой роли нужно **4050** коинов!')
            )
        }
        dbuser.money -= 4050;
        dbuser.save();
        const server = client.guilds.cache.get(message.guild.id);
        var role = "874388491516121157";
        message.member.roles.add(role).catch(() => { console.error });
        message.channel.send(
            emb
                .setTitle(':green_circle: | Успешно!')
                .setDescription('Вы успешно купили роль.')
                .setColor('GREEN')
        )
    } else if(args[0] == '5') {
        if(dbuser.money < 5000) {
            return message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription('Недостаточно коинов! Для покупки этой роли нужно **5000** коинов!')
            )
        }
        dbuser.money -= 5000;
        dbuser.save();
        const server = client.guilds.cache.get(message.guild.id);
        var role = "874388491541299251";
        message.member.roles.add(role).catch(() => { console.error });
        message.channel.send(
            emb
                .setTitle(':green_circle: | Успешно!')
                .setDescription('Вы успешно купили роль.')
                .setColor('GREEN')
        )
    } else if(args[0] == '6') {
        if(dbuser.money < 8000) {
            return message.channel.send(
                emb
                    .setTitle(':red_circle: | Ошибка!')
                    .setDescription('Недостаточно коинов! Для покупки этой роли нужно **8000** коинов!')
            )
        }
        dbuser.money -= 8000;
        dbuser.save();
        const server = client.guilds.cache.get(message.guild.id);
        var role = "875070174045302846";
        message.member.roles.add(role).catch(() => { console.error });
        message.channel.send(
            emb
                .setTitle(':green_circle: | Успешно!')
                .setDescription('Вы успешно купили роль.')
                .setColor('GREEN')
        )
    } else {
        message.channel.send(
            emb
                .setTitle(':red_circle: | Ошибка!')
                .setDescription('Укажите номер роли для покупки (магазин по команде `shop`).')
                .setColor('RED')
        )
    }
}
if(command == 'voicetime') {
    let em = new Discord.MessageEmbed();
    const target = message.mentions.users.first() || message.author;
    
    const user = await client.discordVoice.fetch(target.id, message.guild.id);
    
    if (!user) {
        return message.channel.send(
        em
            .setTitle(':red_circle: | Ошибка!')
            .setDescription('У пользователя нет активности в голосовых каналах!')
            .setColor('RED')
    );
    }
    let t = user.data.voiceTime.total;
    let tt = ms(t || 1000);
    tt.replace('h', ' часов');
    tt.replace('m', ' минут');
    tt.replace('s', ' секунд');
    tt.replace('d', ' дней');
    tt.replace('y', ' лет');
    message.channel.send(
        em
            .setTitle(':clock3: | Активность в голосовых каналах')
            .setDescription(`**${target.tag}** провел(а) в голосовых каналах всего ${tt}`)
            .setColor('GREEN')
    );
    }
if(command == 'voicetop') {
let em = new Discord.MessageEmbed();
const rawLeaderboard = await client.discordVoice.fetchLeaderboard(message.guild.id, 10);

if (rawLeaderboard.length < 1) {
    return message.channel.send(
        em
            .setTitle(':red_circle: | Ошибка!')
            .setDescription('В топе по активности в голосовых каналах никого нет!')
            .setColor('RED')
    )
}
const leaderboard = await client.discordVoice.computeLeaderboard(client, rawLeaderboard, true);
const lb = leaderboard.map(e => `\`\`\`${e.position}. ${e.username}#${e.discriminator}\nВремя в голосовых каналах: ${ms(e.voiceTime.total)}\`\`\``);
message.channel.send(
    em
        .setTitle(':bar_chart: | Топ по активности в голосовых каналах')
        .setDescription(`\n\n${lb.join("\n\n")}`)
        .setColor('GREEN')
    );
}
if(command == 'messagetop') {
    let em = new Discord.MessageEmbed();
    let lets = await Users.find({ guildID: message.guild.id, messages: { $gte: 0 } });
    lets.sort((a, b) => b.messages - a.messages);
    lets.slice(0, 9);
    const lb = lets.map(e => `\`\`\`${client.users.cache.get(e.userID).username}#${client.users.cache.get(e.userID).discriminator}\nСообщений: ${e.messages}\`\`\``);
    message.channel.send(
        em
        .setTitle(':bar_chart: | Топ по активности в чатах')
        .setDescription(`\n\n${lb.join("\n\n")}`)
        .setColor('GREEN')
    )
}
}

});
technicalbot.on("voiceStateUpdate", async (oldVoiceState, newVoiceState) => {
    let dbuser = await Users.findOne({ guildID: newVoiceState.guild.id, userID: newVoiceState.member.id });
    if (newVoiceState.channel) {
        if(newVoiceState.channel.id == '875489607851061269') {
            let osamba = ['875490994634780672', '875491011634270228', '875491028164018196', '875491042219155456', '875491057981345843', '875492265148166224', '875492280809685032', '875492300573261894', '875492317123969084', '875492334152859680'];
            let a = Math.floor(Math.random() * osamba.length);
            newVoiceState.member.voice.setChannel(osamba[a]);
        }
        if(newVoiceState.channel.id == '875782308014202900') {
            if(dbuser.privoice == '0') {
                var emojis = [
                    '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
                ];
                let emoji = emojis[Math.floor(Math.random() * emojis.length)];
                
                // await newVoiceState.guild.createChannel(emoji, "voice")
                newVoiceState.guild.channels.create(emoji, {
                    type: 'voice',
                    parent: '875810377332588574'
                  }).then(channel => { dbuser.privoice = channel.id; dbuser.save(); newVoiceState.member.voice.setChannel(newVoiceState.guild.channels.cache.find(r => r.id === channel.id)); });
                //receivedMessage.guild.channels.find(r => r.name === `voice-${randomnumber}`).delete()
            } else {
                client.guilds.cache.get('874388491516121148').channels.cache.get(dbuser.privoice).delete().catch(err => {
                    console.log(err)
                    dbuser.privoice = '0';
                    dbuser.save();
                }).then(() => {
                    dbuser.privoice = '0';
                    dbuser.save();
                });
                if(newVoiceState.guild.id == '874388491516121148') {
                var emojis = [
                    '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
                ];
                let emoji = emojis[Math.floor(Math.random() * emojis.length)];
                
                // await newVoiceState.guild.createChannel(emoji, "voice")
                newVoiceState.guild.channels.create(emoji, {
                    type: 'voice',
                    parent: '875810377332588574'
                }).then(channel => { dbuser.privoice = channel.id; dbuser.save(); newVoiceState.member.voice.setChannel(newVoiceState.guild.channels.cache.find(r => r.id === channel.id)); });
                } 
            }


        }

        if(dbuser.privoice == '0') {
            
        } else {
            if(oldVoiceState.channel && !newVoiceState.channel) {
                client.guilds.cache.get('874388491516121148').channels.cache.get(dbuser.privoice).delete().catch(err => {
                    console.log(err)
                    dbuser.privoice = '0';
                    dbuser.save();
                }).then(() => {
                    dbuser.privoice = '0';
                    dbuser.save();
                });
            } else {
            if(newVoiceState.channel.id == dbuser.privoice) {
            } else {
                client.guilds.cache.get('874388491516121148').channels.cache.get(dbuser.privoice).delete().then(() => {
                dbuser.privoice = '0';
                dbuser.save();
            }).catch(() => {
                    dbuser.privoice = '0';
                    dbuser.save();
            });
            }
        }
        }
    }
    // if (oldVoiceState.channel) {
    //     console.log(`${oldVoiceState.member.user.tag} вышел из ${oldVoiceState.channel.name}.`)
    // };
});

process.on('unhandledRejection', console.error);

client.login(cfg.token);
technicalbot.login(cfg.token);