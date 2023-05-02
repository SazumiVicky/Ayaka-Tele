function ayakadonasiHandler(bot) {
    bot.onText(/\/donasi|\/sedekah/, (msg) => {
      const chatId = msg.chat.id;
      const photoUrl = 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/IMG_20230404_140556.jpg';
      const caption = `Halo kak ${msg.from.first_name}! jika kamu ingin donasi ke Ayaka bisa melalui qris di atas yah..`;
      
      bot.sendPhoto(chatId, photoUrl, { caption: caption }).catch((error) => {
        console.log(error);
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mengirim foto.');
      });
    });
  }
  
  module.exports = { ayakadonasiHandler };