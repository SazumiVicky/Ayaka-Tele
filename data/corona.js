const axios = require('axios');

function coronaHandler(bot, msg) {
  const command = msg.text ? msg.text.toLowerCase() : '';

  if (command === '/corona') {
    const apiUrl = 'https://api.lolhuman.xyz/api/corona/global?apikey=dannlaina';
    const imageUrl = 'https://rs.unud.ac.id/wp-content/uploads/2020/02/novel-corona-virus.jpg';

    axios.get(apiUrl)
      .then(response => {
        const data = response.data.result;
        const message = `🦠 Kasus COVID-19 di seluruh dunia:\n\n😷 Kasus: ${data.positif}\n😇 Sembuh: ${data.sembuh}\n💀 Meninggal: ${data.meninggal}`;

        bot.sendPhoto(msg.chat.id, imageUrl, { caption: message });
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat mengambil data kasus COVID-19.');
      });
  }
}

module.exports = function(bot) {
  bot.on('message', (msg) => {
    coronaHandler(bot, msg);
  });
};