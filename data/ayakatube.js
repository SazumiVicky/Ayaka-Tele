const ytdl = require('ytdl-core');

function ayakatubeHandler(bot) {
  bot.onText(/^\/yt (.+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const videoLink = match[1];
    bot.sendMessage(chatId, 'Ayaka sedang memuat link Anda, tunggu sebentar..');

    try {
      const info = await ytdl.getInfo(videoLink);
      const videoFormats = ytdl.filterFormats(info.formats, 'videoonly');
      
      if (videoFormats.length > 0) {
        const videoUrl = videoFormats[0].url;
        bot.sendVideo(chatId, videoUrl);
      } else {
        bot.sendMessage(chatId, 'Maaf, tidak ada format video yang ditemukan.');
      }
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mengambil informasi video.');
    }
  });
}

module.exports = { ayakatubeHandler };