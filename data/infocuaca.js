const axios = require('axios');

const API_KEY = 'dannlaina';

async function getWeatherInfo(city) {
  try {
    const response = await axios.get(`https://api.lolhuman.xyz/api/cuaca/${city}?apikey=${API_KEY}`);
    const data = response.data.result;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = (bot) => {
  bot.onText(/^\/infocuaca(?:\s+(.+)|)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const city = match[1];
    if (!city) {
      bot.sendMessage(chatId, 'Masukkan nama kota / negara, Contoh: /infocuaca Makassar');
      return;
    }
    try {
      const data = await getWeatherInfo(city);
      if (!data) {
        bot.sendMessage(chatId, `Maaf, tidak dapat menemukan informasi cuaca untuk kota ${city}.`);
        return;
      }
      const message = `Informasi cuaca untuk kota ${city}: \n• Cuaca: ${data.cuaca}\n• Suhu: ${data.suhu}\n• Kelembapan: ${data.kelembapan}\n• Angin: ${data.angin}\n• Deskripsi: ${data.description}\n• Tekanan Udara: ${data.udara}\n• Tekanan Permukaan Laut: ${data.permukaan_laut}\n`;
      bot.sendMessage(chatId, message);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
};