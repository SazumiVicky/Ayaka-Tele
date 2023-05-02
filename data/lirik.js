const fetch = require('node-fetch');

async function lirikHandler(bot) {
  bot.onText(/^\/lirik(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const songTitle = match[1];

    if (!songTitle) {
      bot.sendMessage(chatId, 'Masukan judul lagu yang ingin Anda cari liriknya, contoh: /lirik cupid');
      return;
    }

    const apiUrl = `https://api.lolhuman.xyz/api/lirik?apikey=dannlaina&query=${encodeURIComponent(songTitle)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const responseData = await response.json();
      const { result } = responseData;

      if (!result) {
        bot.sendMessage(chatId, 'Maaf, lirik lagu yang Anda cari tidak ditemukan.');
        return;
      }

      bot.sendMessage(chatId, result);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mencari lirik lagu.');
    }
  });
}

module.exports = lirikHandler;