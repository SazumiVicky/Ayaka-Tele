const axios = require('axios');

async function handleDetikNewsCommand(bot, msg) {
  const chatId = msg.chat.id;

  try {
    const response = await axios.get('https://api.lolhuman.xyz/api/detik?apikey=dannlaina');
    const data = response.data.result;

    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const article = data[randomIndex];

      let caption = '';
      if (article.title) {
        caption += `${article.title}\n\n`;
      }
      if (article.date) {
        caption += `${article.date}\n\n`;
      }
      if (article.link) {
        caption += `${article.link}`;
      }

      if (caption !== '') {
        if (article.thumb) {
          // Jika artikel memiliki gambar, kirim gambar tersebut dengan keterangan
          await bot.sendPhoto(chatId, article.thumb, { caption });
        } else {
          // Jika tidak ada gambar, kirim keterangan saja
          await bot.sendMessage(chatId, caption);
        }
      } else {
        bot.sendMessage(chatId, 'Maaf, tidak ada berita yang ditemukan.');
      }
    } else {
      bot.sendMessage(chatId, 'Maaf, tidak ada berita yang ditemukan.');
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat mengambil berita.');
  }
}

module.exports = {
  handleDetikNewsCommand,
};