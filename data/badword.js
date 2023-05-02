function badwordHandler(bot) {
    // code by sazumi viki
    const badwords = ['ajg', '/ajg', 'kontol', '/kontol', 'memek', '/memek', 'asu', '/asu', 'puki', '/puki', 'tolol', '/tolol', 'ngentot', '/ngentot', 'pukimak', '/pukimak', 'celeng', '/celeng', 'babi', '/babi', 'ngntot', '/ngntot', 'jing', '/jing', 'mmk', '/mmk', 'tlol', '/tlol', 'kntl', '/kntl'];
  
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const message = msg.text.toLowerCase();
      
      const isBadword = badwords.some((word) => {
        return message.includes(word);
      });
  
      if (isBadword) {
        bot.sendMessage(chatId, 'Ayaka mendeteksi badword, mohon untuk selalu menjaga ketikan Anda..');
      }
    });
  }
  
  module.exports = {
    badwordHandler
  };