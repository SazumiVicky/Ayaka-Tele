const axios = require('axios');

function simiHandler(bot) {
  bot.onText(/\/simi (.+)/, (msg, match) => {
    const question = match[1];
    const query = encodeURIComponent(question);
    const apiUrl = `https://api.lolhuman.xyz/api/simi?apikey=dannlaina&text=${query}&badword=true`;
    axios.get(apiUrl)
      .then(response => {
        const answer = response.data.result;
        bot.sendMessage(msg.chat.id, answer);
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan saat mencari jawaban.');
      });
  });

  bot.onText(/\/simi$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Contoh: /simi halo simi');
  });
}

module.exports = { simiHandler };