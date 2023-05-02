const axios = require('axios');

function proxySiteHandler(bot) {
  bot.onText(/\/proxy (.+)/, (msg, match) => {
    const websiteUrl = match[1];
    const apiUrl = `https://api.lolhuman.xyz/api/proxysite?apikey=dannlaina&url=${websiteUrl}`;
    axios.get(apiUrl)
      .then(response => {
        const proxyResult = response.data.result;
        bot.sendMessage(msg.chat.id, `Berikut adalah hasil proxy untuk ${websiteUrl}:\n${proxyResult}`);
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan saat melakukan proxy website.');
      });
  });

  bot.onText(/\/proxy$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Anda belum memberikan website yang ingin di-proxy. Contoh: /proxy google.com');
  });
}

module.exports = { proxySiteHandler };