const axios = require('axios');
const API_KEY = 'dannlaina';

function handlePixivCommand(bot) {
  bot.onText(/\/pixiv (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];
    try {
      const response = await axios.get(`https://api.lolhuman.xyz/api/pixiv?apikey=${API_KEY}&query=${encodeURI(query)}`);
      const result = response.data.result;
      if (result.length === 0) {
        bot.sendMessage(chatId, 'Maaf, gambar yang Anda cari tidak ditemukan.');
        return;
      }
      const randomIndex = Math.floor(Math.random() * result.length);
      const data = result[randomIndex];
      const title = data.title;
      const imageUrl = data.image;
      const message = `Judul gambar: ${title}\nURL gambar: ${imageUrl}`;
      bot.sendPhoto(chatId, imageUrl, { caption: message });
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });

  bot.onText(/^\/pixiv$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Masukkan nama gambar yang ingin kamu cari, Contoh: /pixiv Hatsune Miku');
  });
}

module.exports = { handlePixivCommand };