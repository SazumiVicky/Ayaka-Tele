const axios = require('axios');
const LOLHUMAN_API_KEY = 'dannlaina';

function handleFaktaUnikCommand(bot) {
  bot.onText(/\/faktaunik/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const response = await axios.get(`https://api.lolhuman.xyz/api/random/faktaunik?apikey=${LOLHUMAN_API_KEY}`);
      const { result } = response.data;
      bot.sendMessage(chatId, result);
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
}

module.exports = { handleFaktaUnikCommand };