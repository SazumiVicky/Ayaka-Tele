const axios = require("axios");

function ayakacaklontongHandler(bot) {
  bot.onText(/\/caklontong/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const response = await axios.get("https://api.lolhuman.xyz/api/tebak/caklontong?apikey=dannlaina");
      console.log(response.data);
      const { result } = response.data;
      bot.sendMessage(chatId, `Pertanyaan: ${result.question}\nJawaban: ${result.answer}`);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "Terjadi kesalahan saat mengambil data dari API.");
    }
  });
}

module.exports = {
  ayakacaklontongHandler,
};