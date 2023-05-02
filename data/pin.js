// DannTeam
const axios = require('axios');

function pinHandler(bot, msg, match) {
  const query = match[1] ? encodeURIComponent(match[1]) : null;

  if (!query) {
    bot.sendMessage(msg.chat.id, 'Maaf, masukkan nama foto yang ingin Anda cari. Contoh: /pin momo hirai');
    return;
  }

  const apiUrl = `https://api.lolhuman.xyz/api/pinterest?apikey=dannlaina&query=${query}`;

  axios.get(apiUrl)
    .then(response => {
      const imageUrl = response.data.result;

      bot.sendPhoto(msg.chat.id, imageUrl);
    })
    .catch(error => {
      console.log(error);
      bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat mengambil gambar dari Pinterest.');
    });
}

module.exports = function(bot) {
  bot.onText(/\/pin(?:\s+(.+))?/, (msg, match) => {
    pinHandler(bot, msg, match);
  });
};