function handleVerification(bot) {
    bot.onText(/\/(start|verifikasi)/, (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
      const url = 'https://t.me/ayakaverifybot';
      const text = `Halo kak ${name}! Mohon verifikasi email kamu terlebih dahulu bersama Ayaka Verification pada kontak berikut: ${url}`;
  
      bot.sendMessage(chatId, text);
    });
  }
  
  module.exports = handleVerification;