const axios = require('axios');

function doujinDesuHandler(bot, msg) {
  const command = msg.text ? msg.text.toLowerCase() : '';

  if (command === '/doujindesu') {
    const apiUrl = 'https://api.lolhuman.xyz/api/doujindesulatest?apikey=dannlaina';

    axios.get(apiUrl)
      .then(response => {
        const data = response.data.result[Math.floor(Math.random() * response.data.result.length)];
        const message = `🔞 *Judul*: ${data.title}\n🔗 *Link*: ${data.link}\n📷 *Episode Thumbnail*:`;

        bot.sendPhoto(msg.chat.id, data.thumbnail, { caption: message, parse_mode: 'Markdown' });
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat melakukan pencarian di DoujinDesu.');
      });
  }
}

module.exports = function(bot) {
  bot.on('message', (msg) => {
    doujinDesuHandler(bot, msg);
  });
};