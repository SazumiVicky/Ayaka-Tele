const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');

// code by sazumi viki
const TOKEN = 'token_bot_anda';

const OWNER_USERNAME = 'sazumiviki';

const bot = new TelegramBot(TOKEN);

bot.on('polling_error', (error) => {
  console.log(error);
});

bot.on('webhook_error', (error) => {
  console.log(error);
});

function ayakarestartHandler(bot) {
  bot.onText(/\/restart/, (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text.toLowerCase();

    if (msg.from.username !== OWNER_USERNAME) {
      bot.sendMessage(chatId, `Maaf Ayaka mendeteksi kamu bukan owner Ayaka, perintah ini hanya bisa dijalankan oleh owner Ayaka saja..`);
      return;
    }

    bot.sendMessage(chatId, `Sedang memulai ulang Ayaka...`);
    console.log(message);
    exec(`pm2 restart Ayaka`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        bot.sendMessage(chatId, `Kamu belum menginstall PM2 pada perangkat kamu. Kamu bisa menggunakan fitur ini ketika PM2 sudah diinstall di perangkat kamu.`);
        bot.sendMessage(chatId, `PM2 Install`, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'PM2 Install',
                  url: 'https://pm2.keymetrics.io/'
                }
              ]
            ]
          }
        });
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      bot.sendMessage(chatId, `Bot berhasil dimulai ulang!`);
    });
  });
}

module.exports = { ayakarestartHandler };