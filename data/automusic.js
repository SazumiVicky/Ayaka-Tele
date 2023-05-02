// code by sazumi viki
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

function sendMusic(bot, chatId, musicPath) {
  const music = fs.readFileSync(musicPath);
  bot.sendAudio(chatId, music);
}

module.exports = {
  sendMusic,
};