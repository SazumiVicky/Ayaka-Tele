const axios = require('axios');

module.exports = (bot) => {
  bot.onText(/\/hextostring (.+)/, async (msg, match) => {
    const hexString = match[1];
    try {
      const response = await axios.get(`https://api.lolhuman.xyz/api/convert/hextostr?apikey=dannlaina&hex=${encodeURIComponent(hexString)}`);
      const text = response.data.result;
      const message = `Berikut adalah teks yang sesuai untuk string heksadesimal "${hexString}":\n\n${text}`;
      bot.sendMessage(msg.chat.id, message);
    } catch (error) {
      console.error(error);
      bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memproses permintaan Anda.');
    }
  });

  bot.onText(/\/hextostring/, (msg) => {
    const message = msg.text.toLowerCase();
    if (message === '/hextostring') {
      bot.sendMessage(msg.chat.id, 'Masukkan kode yang ingin kamu convert ke teks, contoh: /hextostring 53617a756d692056696b69');
    }
  });
};