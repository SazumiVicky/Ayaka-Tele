const fetch = require('node-fetch');

async function storynimeHandler(bot) {
  bot.onText(/^\/storynime$/, async (msg) => {
    const chatId = msg.chat.id;
    const apiUrl = 'https://api.lolhuman.xyz/api/storynime?apikey=dannlaina';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const responseData = await response.json();
      const { result } = responseData;

      bot.sendVideo(chatId, result);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mengambil video dari storynime API.');
    }
  });
}

module.exports = storynimeHandler;