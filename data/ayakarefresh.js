const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const os = require('os');

// code by sazumi viki
const TOKEN = 'token_bot_anda';
// ganti dengan username Telegram Anda
const OWNER_USERNAME = 'sazumiviki';

const bot = new TelegramBot(TOKEN);

bot.on('polling_error', (error) => {
  console.log(error);
});

bot.on('webhook_error', (error) => {
  console.log(error);
});

function ayakarefreshHandler(bot) {
  bot.onText(/\/refresh/, (msg) => {
    const chatId = msg.chat.id;
    const message = `Sedang merefresh server...`;
    bot.sendMessage(chatId, message);
    console.log(message);
    const vikiDir = 'C:\\path\\to\\viki.exe'; // ganti dengan path ke viki.exe
    const cacheDir = path.join(os.homedir(), '.cache');
    if (msg.from.username !== OWNER_USERNAME) {
      const reply = `Ayaka mendeteksi bahwa kamu bukan owner Ayaka, perintah ini hanya bisa dijalankan oleh owner Ayaka`;
      bot.sendMessage(chatId, reply);
      return;
    }
    exec(`mkdir ${cacheDir}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        bot.sendMessage(chatId, `Terjadi kesalahan saat membuat direktori cache: ${error.message}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      exec(`taskkill /F /IM viki.exe && start "" "${vikiDir}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          bot.sendMessage(chatId, `Terjadi kesalahan saat merefresh server: ${error.message}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        bot.sendMessage(chatId, `Server berhasil direfresh!`);
      });
      exec(`rmdir /s /q "${cacheDir}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          bot.sendMessage(chatId, `Terjadi kesalahan saat membersihkan cache: ${error.message}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        bot.sendMessage(chatId, `Cache berhasil dihapus!`);
      });
    });
  });
}

module.exports = { ayakarefreshHandler };