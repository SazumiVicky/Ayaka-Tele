const fetch = require('node-fetch');

async function attpHandler(bot) {
  bot.onText(/^\/attp (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1];
    const url = `https://api.lolhuman.xyz/api/attp?apikey=dannlaina&text=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const buffer = await response.buffer();
      bot.sendDocument(chatId, buffer);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mengonversi teks menjadi GIF.');
    }
  });

  bot.onText(/^\/attp$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Masukan teks, contoh: /attp viki ganteng');
  });
}

module.exports = attpHandler;