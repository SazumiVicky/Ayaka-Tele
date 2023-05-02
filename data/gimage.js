const axios = require('axios');
const API_KEY = 'dannlaina';

function handleGImageCommand(bot) {
  bot.onText(/\/gimage (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];
    try {
      const timestamp = new Date().getTime();
      const imageUrl = `https://api.lolhuman.xyz/api/gimage?apikey=${API_KEY}&query=${encodeURI(query)}&timestamp=${timestamp}`;
      bot.sendPhoto(chatId, imageUrl);
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });

  bot.onText(/^\/gimage$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Masukan nama foto yang ingin kamu cari, Contoh: /gimage Sazumi Viki');
  });
}

module.exports = { handleGImageCommand };