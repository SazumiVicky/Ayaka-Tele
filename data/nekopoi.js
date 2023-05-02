const axios = require('axios');

function handleNekopoiCommand(bot) {
  bot.onText(/\/nekopoi (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const title = match[1];
    const apiUrl = `https://api.lolhuman.xyz/api/nekopoi?apikey=dannlaina&url=https://nekopoi.care/search/?s=${title}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data.result[0];

      if (data.status === 200) {
        const { thumbnail, sinopsis, genre, title: animeTitle, producers, duration, link } = data;
        const genreText = genre ? genre.join(', ') : '';
        const reply = `Judul: ${animeTitle}\n\nSinopsis: ${sinopsis}\n\nGenre: ${genreText}\n\nProducers: ${producers}\n\nDurasi: ${duration}\n\nThumbnail: ${thumbnail}\n\nLink:\n720p:\n${JSON.stringify(link['720p'], null, 2)}`;
        bot.sendMessage(chatId, reply);
      } else {
        bot.sendMessage(chatId, `Maaf, tidak dapat menemukan informasi untuk judul "${title}".`);
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
}

module.exports = {
  handleNekopoiCommand
};