function ayakaspamHandler(bot) {
    const spamThreshold = 3 * 1000;
    const spamMap = new Map();
    // code by sazumi viki
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const senderName = msg.from.first_name;
      const now = Date.now();
  

      if (spamMap.has(msg.chat.id)) {
        const lastMessageTime = spamMap.get(msg.chat.id);
        const elapsedTime = now - lastMessageTime;
  
        if (elapsedTime < spamThreshold) {
          bot.sendMessage(chatId, `Ayaka mendeteksi spam, ${senderName} telah melakukan spam chat. Mohon untuk memberi jeda chat selama 3 detik.`);
        }
      }
  
      spamMap.set(msg.chat.id, now);
    });
  }
  
  module.exports = {
    ayakaspamHandler
  };