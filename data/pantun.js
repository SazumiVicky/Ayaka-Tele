const axios = require('axios');
const API_KEY = 'dannlaina';

function handlePantunCommand(bot) {
  bot.onText(/\/pantun/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const response = await axios.get(`https://api.lolhuman.xyz/api/random/pantun?apikey=${API_KEY}`);
      const { result } = response.data;
      bot.sendMessage(chatId, result);
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
}

module.exports = { handlePantunCommand };