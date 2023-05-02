function monitorayakaHandler(bot) {
    // code by sazumi viki
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const messageNumber = msg.message_id;
      const senderName = msg.from.first_name;
      const messageText = msg.text;
  
      console.log(`Pesan baru dari ${senderName} (ID Chat: ${chatId})`);
      console.log(`Nomor pesan: ${messageNumber}`);
      console.log(`Isi pesan: ${messageText}`);
    });
  }
  
  module.exports = {
    monitorayakaHandler
  };