function ayakarulesHandler(bot) {
    // code by sazumi viki
    bot.onText(/\/rules/, (msg) => {
      const chatId = msg.chat.id;
      const rules = [
        '1. Tidak boleh mengirimkan pesan spam.',
        '2. Tidak boleh mengirimkan konten yang mengandung kekerasan, pornografi, atau hal yang merugikan orang lain.',
        '3. Harap bersikap sopan dan menghormati pengguna lain selama chat dengan Ayaka.'
      ];
  
      bot.sendMessage(chatId, `Berikut adalah rules selama chat dengan Ayaka:\n${rules.join('\n')}`);
    });
  }
  
  module.exports = {
    ayakarulesHandler
  };