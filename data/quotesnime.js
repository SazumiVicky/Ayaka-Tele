const axios = require('axios');

function quotesAnimeHandler(bot) {
  bot.onText(/\/quotesanime/, (msg) => {
    const apiUrl = 'https://animechan.vercel.app/api/random';
    axios.get(apiUrl)
      .then(response => {
        const quote = response.data.quote;
        const character = response.data.character;
        const anime = response.data.anime;
        bot.sendMessage(msg.chat.id, `\n"${quote}"\n- ${character} (${anime})`);
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan saat mengambil quote anime.');
      });
  });
}

module.exports = { quotesAnimeHandler };