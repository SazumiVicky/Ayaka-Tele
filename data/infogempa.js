const axios = require('axios');

const API_KEY = 'dannlaina';

async function getGempaInfo() {
  try {
    const response = await axios.get(`https://api.lolhuman.xyz/api/infogempa?apikey=${API_KEY}`);
    const data = response.data.result;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = (bot) => {
  bot.onText(/^\/infogempa$/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const data = await getGempaInfo();
      if (!data) {
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
        return;
      }
      const imageUrl = data.map;
      const message = `Terkini: \n• Lokasi: ${data.lokasi}\n• Waktu: ${data.waktu}\n• Kedalaman: ${data.kedalaman}\n• Magnitudo: ${data.magnitude}\n• Keterangan: ${data.potensi}\n`;
      bot.sendPhoto(chatId, imageUrl, { caption: message });
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
};