function ownerHandler(bot) {
    // code by sazumi viki
    bot.onText(/\/?owner/i, (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
      const buttons = [
        {
          text: 'Instagram',
          url: 'https://instagram.com/moe.sazumiviki'
        },
        {
          text: 'Facebook',
          url: 'https://facebook.com/moe.sazumiviki'
        },
        {
          text: 'GitHub',
          url: 'https://github.com/SazumiVicky'
        },
        {
          text: 'WhatsApp',
          url: 'https://wa.me/6285236226786'
        }
      ];
      bot.sendMessage(chatId, `Halo kak ${name}, kamu bisa terhubung dengan owner Ayaka melalui link di bawah:`, {
        reply_markup: {
          inline_keyboard: [buttons]
        }
      });
    });
  }
  
  module.exports = {
    ownerHandler
  };