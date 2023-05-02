const fetch = require('node-fetch');

function handleAsupanCommand(bot) {
  bot.onText(/\/asupan/, async (msg) => {
    const chatId = msg.chat.id;
    const apiURL = 'https://api.lolhuman.xyz/api/asupan?apikey=dannlaina';

    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      if (data.status === 200) {
        bot.sendPhoto(chatId, data.result);
      } else {
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
}

module.exports = {
  handleAsupanCommand
};