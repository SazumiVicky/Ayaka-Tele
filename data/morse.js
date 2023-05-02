const axios = require('axios');

module.exports = (bot) => {
  bot.onText(/\/morse (.+)/, async (msg, match) => {
    const text = match[1];
    try {
      const response = await axios.get(`https://api.lolhuman.xyz/api/morse/encrypt?apikey=dannlaina&text=${encodeURIComponent(text)}`);
      const morseCode = response.data.result;
      const message = `Berikut adalah kode morse untuk teks "${text}":\n\n${morseCode}`;
      bot.sendMessage(msg.chat.id, message);
    } catch (error) {
      console.error(error);
      bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memproses permintaan Anda.');
    }
  });

  bot.onText(/\/morse/, (msg) => {
    const message = msg.text.toLowerCase();
    if (message === '/morse') {
      bot.sendMessage(msg.chat.id, 'Masukkan teks yang ingin dikonversi ke kode morse, contoh: /morse ayaka always choose viki');
    }
  });
};