function callOwnerHandler(bot) {
    // code by sazumi viki
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const message = msg.text.toLowerCase();
  
      if (message.includes('viki') || message.includes('piki') || message.includes('kii') || message.includes('kyy') || message.includes('ky') || message.includes('ki') || message.includes('vicky') || message.includes('vic') || message.includes('vik')) {
        const name = msg.from.first_name;
        bot.sendMessage(chatId, `Kenapa kak ${name} manggil manggil owner Ayaka ? cuman Ayaka yang boleh manggil Owner aku..`);
      }
    });
  }
  
  module.exports = {
    callOwnerHandler
  };