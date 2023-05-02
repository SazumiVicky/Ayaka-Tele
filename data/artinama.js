const fetch = require('node-fetch');

function handleArtiNamaCommand(bot) {
  bot.onText(/\/artinama(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const nama = match[1].trim();
    
    if (nama === '') {
      bot.sendMessage(chatId, 'Masukan nama yang ingin Anda cek, Contoh: /artinama Viki');
      return;
    }
    
    const apiURL = `https://api.lolhuman.xyz/api/artinama?apikey=dannlaina&nama=${nama}`;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      if (data.status === 200) {
        bot.sendMessage(chatId, data.result);
      } else {
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });

  bot.onText(/^\/artinama$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Masukan nama yang ingin Anda cek, Contoh: /artinama Viki');
  });
}

module.exports = {
  handleArtiNamaCommand
};