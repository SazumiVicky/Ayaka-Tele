const fetch = require('node-fetch');

async function tiktokProfileHandler(bot) {
    bot.onText(/^\/ttprofile(?:\s+(\w+))?$/, async (msg, match) => {
      const chatId = msg.chat.id;
      const username = match[1];
  
      if (!username) {
        bot.sendMessage(chatId, 'Masukan username yang ingin Anda download profile nya, contoh: /ttprofile ayaka');
        return;
      }
  
      const apiUrl = `https://api.lolhuman.xyz/api/pptiktok/${username}?apikey=dannlaina`;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status code ${response.status}`);
        }
  
        const imageBuffer = await response.buffer();
  
        bot.sendPhoto(chatId, imageBuffer);
      } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam mengambil foto profil TikTok.');
      }
    });
  }
  
  module.exports = tiktokProfileHandler;