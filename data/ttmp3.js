const fetch = require('node-fetch');

// Fungsi untuk mengambil ekstensi file dari URL
function getFileExtension(url) {
  const extension = url.split('.').pop();
  return extension.split('?')[0];
}

async function tiktokMusicHandler(bot) {
  bot.onText(/^\/ttmp3(?!.*\bhttps?:\/\/)/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Masukan link TikTok yang ingin Anda ubah ke audio, contoh: /ttmp3 https://www.tiktok.com/xxxxxxxxx');
  });

  bot.onText(/^\/ttmp3 (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];
    const apiUrl = `https://api.lolhuman.xyz/api/tiktokmusic?apikey=dannlaina&url=${encodeURIComponent(url)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType.startsWith('audio/')) {
        throw new Error(`Invalid content type: ${contentType}`);
      }

      const audioBuffer = await response.buffer();
      const audioExtension = getFileExtension(url);
      const audioName = `tiktok.${audioExtension}`;

      bot.sendAudio(chatId, audioBuffer, {
        fileName: audioName
      });
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mengunduh audio dari TikTok.');
    }
  });
}

module.exports = tiktokMusicHandler;