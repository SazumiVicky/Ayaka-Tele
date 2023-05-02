function helloAyakaHandler(bot) {
    // code by sazumi viki
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const message = msg.text.toLowerCase();
  
      if (message.includes('ayaka') || message.includes('bot')) {
        const name = msg.from.first_name;
        bot.sendMessage(chatId, `Ada apa kak ${name} manggil-manggil Ayaka?`);
      }
    });
  }
  
  module.exports = {
    helloAyakaHandler
  };