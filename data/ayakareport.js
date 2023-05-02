const os = require('os');
const TelegramBot = require('node-telegram-bot-api');

// code by sazumi viki
const TOKEN = 'token_bot_anda';

const CHAT_USERNAME = 'sazumiviki';

const bot = new TelegramBot(TOKEN);

const hostname = os.hostname();

bot.on('polling_error', (error) => {
  console.log(error);
});

bot.on('webhook_error', (error) => {
  console.log(error);
});

bot.on('message', (msg) => {
  console.log(msg);
});

bot.on('connected', () => {
  const message = `Ayaka online kembali, ${hostname}`;
  bot.sendMessage(`@${CHAT_USERNAME}`, message);
});

module.exports = {
  ayakareportHandler: (bot) => {
    bot.on('connected', () => {
      const message = `Ayaka online kembali, ${hostname}`;
      bot.sendMessage(`@${CHAT_USERNAME}`, message);
    });
  }
};