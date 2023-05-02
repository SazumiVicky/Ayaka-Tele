const axios = require('axios');

function handleOpenAICommand(bot) {
  bot.onText(/\/ai(\s+.+)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const question = match[1] ? match[1].trim() : null;
    const apiKey = 'dannlaina';

    if (!question) {
      bot.sendMessage(chatId, 'Masukan pertanyaan, contoh: /ai kenapa viki ganteng banget');
      return;
    }

    const apiUrl = `https://api.lolhuman.xyz/api/openai?apikey=${apiKey}&text=${encodeURIComponent(question)}&user=${msg.from.id}`;

    try {
      const response = await axios.get(apiUrl);
      const answer = response.data.result;

      if (!answer) {
        bot.sendMessage(chatId, 'Maaf, tidak dapat menemukan jawaban untuk pertanyaan Anda.');
        return;
      }

      bot.sendMessage(chatId, answer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat mengambil data.');
    }
  });
}

module.exports = {
  handleOpenAICommand
};