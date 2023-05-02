const fetch = require('node-fetch');

async function spamCallHandler(bot) {
  bot.onText(/^\/spamcall(?:\s+(\d+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const phoneNumber = match[1];

    if (!phoneNumber) {
      bot.sendMessage(chatId, 'Masukan nomor yang ingin Anda spamcall, contoh: /spamcall 6285236xxxxxx');
      return;
    }

    const apiUrl = `https://api.lolhuman.xyz/api/spam/call1?apikey=dannlaina&nomor=${phoneNumber}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const responseData = await response.json();
      const { result } = responseData;

      bot.sendMessage(chatId, `Berhasil melakukan spam call ke nomor ${phoneNumber}.`);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam melakukan spam call.');
    }
  });
}

module.exports = spamCallHandler;