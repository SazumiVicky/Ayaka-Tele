const axios = require('axios');

function handleWikiCommand(bot) {
  bot.onText(/\/wiki (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];
    const apiUrl = `https://api.lolhuman.xyz/api/wiki?apikey=dannlaina&query=${query}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data.result;
      const summary = data.replace(/\\n/g, '\n');

      bot.sendMessage(chatId, summary);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat mengambil data.');
    }
  });

  bot.onText(/\/wiki$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Apa yang ingin anda tanyakan? Contoh: /wiki momo hirai');
  });
}

module.exports = {
  handleWikiCommand
};