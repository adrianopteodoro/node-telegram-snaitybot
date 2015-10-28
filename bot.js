var TelegramBot = require('node-telegram-bot-api');

var token = '77180637:AAE5zyRYnijqrnqiMc9UPUrTeQB8baME7cY';

var bot = new TelegramBot(token, {polling: true});

var groupId = -28523202;

bot.getMe().then(function (me) {
    console.log('%s (%s) BOT ONLINE!\n', me.first_name, me.username);
});

bot.on('message', function (msg) {
    //DEBUG ONLY
    console.log(msg);

    var hasUsername = (typeof msg.from.username !== 'undefined');

    var chatId = msg.chat.id;


    if (typeof msg.new_chat_title !== 'undefined') {
        bot.sendChatAction(chatId, "typing");
        if (hasUsername) {
            bot.sendMessage(chatId, "@" + msg.from.username + ", trocou nome do grupo para " + msg.new_chat_title);
        } else {
            bot.sendMessage(chatId, msg.from.first_name + " " + msg.from.last_name + ", trocou nome do grupo para " + msg.new_chat_title);
        }
    } else if (typeof msg.left_chat_participant !== 'undefined') {
        bot.sendChatAction(chatId, "typing");
        var leftHasuser = (typeof msg.left_chat_participant.username !== 'undefined');
        if (hasUsername) {
            if (leftHasuser) {
                bot.sendMessage(chatId, "@" + msg.from.username + ", removeu @" + msg.left_chat_participant.username + " do grupo");
            } else {
                bot.sendMessage(chatId, "@" + msg.from.username + ", removeu " + msg.left_chat_participant.first_name + " " + msg.left_chat_participant.last_name + " do grupo");
            }
        } else {
            if (leftHasuser) {
                bot.sendMessage(chatId, msg.from.first_name + " " + msg.from.last_name + ", removeu @" + msg.left_chat_participant.username + " do grupo");
            } else {
                bot.sendMessage(chatId, msg.from.first_name + " " + msg.from.last_name + ", removeu " + msg.left_chat_participant.first_name + " " + msg.left_chat_participant.last_name + " do grupo");
            }
        }
    } else if (typeof msg.new_chat_participant !== 'undefined') {
        bot.sendChatAction(chatId, "typing");
        var newHasuser = (typeof msg.new_chat_participant.username !== 'undefined');
        if (hasUsername) {
            if (newHasuser) {
                bot.sendMessage(chatId, "@" + msg.from.username + ", adicionou @" + msg.new_chat_participant.username + " ao grupo");
            } else {
                bot.sendMessage(chatId, "@" + msg.from.username + ", adicionou " + msg.new_chat_participant.first_name + " " + msg.new_chat_participant.last_name + " ao grupo");
            }
        } else {
            if (newHasuser) {
                bot.sendMessage(chatId, msg.from.first_name + " " + msg.from.last_name + ", adicionou @" + msg.new_chat_participant.username + " ao grupo");
            } else {
                bot.sendMessage(chatId, msg.from.first_name + " " + msg.from.last_name + ", adicionou " + msg.new_chat_participant.first_name + " " + msg.new_chat_participant.last_name + " ao grupo");
            }
        }
    } else {
        if (typeof msg.chat.title !== 'undefined') {
            console.log("Mention from @%s in %s group chat", msg.from.username, msg.chat.title);

            bot.sendChatAction(chatId, "typing");

            if (hasUsername) {
                bot.sendMessage(chatId, "@" + msg.from.username + ": " + msg.text);
            } else {
                bot.sendMessage(chatId, msg.from.first_name + " " + msg.from.last_name + ": " + msg.text);
            }
        } else {
            console.log("A chat from @%s", msg.from.username);
            bot.sendChatAction(groupId, "typing");
            bot.sendMessage(groupId, msg.text);
        }
        console.log("Text: %s\n", msg.text);
    }
});

bot.getUpdates().then(console.log);