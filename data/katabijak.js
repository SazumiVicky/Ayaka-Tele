function katabijakHandler(bot) {
const axios = require('axios');
    bot.onText(/\/katabijak/, (msg) => {
      axios.get('https://api.lolhuman.xyz/api/random/katabijak?apikey=dannlaina')
        .then(response => {
          const quote = response.data.result;
          bot.sendMessage(msg.chat.id, quote);
        })
        .catch(error => {
          console.log(error);
          bot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan saat mengambil kutipan bijak.');
        });
    });
  }
  
  module.exports = { katabijakHandler };