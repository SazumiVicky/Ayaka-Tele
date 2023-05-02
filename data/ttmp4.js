const fetch = require('node-fetch');

async function tiktokVideoHandler(bot) {
  bot.onText(/^\/ttmp4(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];

    if (!url) {
      bot.sendMessage(chatId, 'Masukan link TikTok yang ingin Anda download, contoh: /ttmp4 https://www.tiktok.com/@username/video/1234567890123456789');
      return;
    }

    const apiUrl = `https://api.lolhuman.xyz/api/tiktok?apikey=dannlaina&url=${encodeURIComponent(url)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const responseData = await response.json();
      const { link, title, author, duration } = responseData.result;

      const videoCaption = `🎬 Judul: ${title}\n👤 Penulis: @${author.username}\n⏱ Durasi: ${duration} detik`;

      bot.sendVideo(chatId, link, {
        caption: `🎞️ Video TikTok yang kamu minta:\n\n${videoCaption}\n\n⚫ Enjoy!`
      });
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mengunduh video dari TikTok.');
    }
  });
}

module.exports = tiktokVideoHandler;