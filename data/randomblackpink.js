const fetch = require('node-fetch');

function handleRandomBlackpinkCommand(bot) {
  bot.onText(/\/blackpink/, async (msg) => {
    const chatId = msg.chat.id;
    const apiUrl = `https://api.lolhuman.xyz/api/random/blackpink?apikey=dannlaina&${Math.random()}`;

    try {
      const response = await fetch(apiUrl);
      bot.sendPhoto(chatId, response.url);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
}

module.exports = {
  handleRandomBlackpinkCommand
};