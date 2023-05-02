function sourceHandler(bot) {
    // code by sazumi viki
    bot.onText(/\/(source|script|sc)/, (msg) => {
      const chatId = msg.chat.id;
      const button = {
        text: 'Source Code',
        url: 'https://github.com/SazumiVicky/Ayaka-SmartTele'
      };
      bot.sendMessage(chatId, 'Halo kak, untuk mendapatkan source code Ayaka kamu bisa melalui link di bawah ini:', {
        reply_markup: {
          inline_keyboard: [[button]]
        }
      });
    });
  }
  
  module.exports = {
    sourceHandler
  };