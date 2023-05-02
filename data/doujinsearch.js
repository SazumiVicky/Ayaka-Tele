const fetch = require('node-fetch');

function handleDoujinSearchCommand(bot) {
  bot.onText(/\/doujinsearch$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Masukan nama doujin yang ingin kamu cari, Contoh: /doujinsearch ayaka');
  });

  bot.onText(/\/doujinsearch (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const doujinName = match[1].trim();

    const apiUrl = `https://api.lolhuman.xyz/api/doujindesusearch?apikey=dannlaina&query=${encodeURIComponent(doujinName)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 200) {
        const result = data.result;
        if (result.length === 0) {
          bot.sendMessage(chatId, `Maaf, tidak ada doujin yang ditemukan dengan nama ${doujinName}.`);
        } else {
          for (let doujin of result) {
            const message = `Title: ${doujin.title}\nType: ${doujin.type}\nLink: ${doujin.link}`;
            bot.sendPhoto(chatId, doujin.thumbnail, {caption: message});
          }
        }
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
  handleDoujinSearchCommand
};