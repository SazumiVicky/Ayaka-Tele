const axios = require('axios');

module.exports = (bot) => {
  bot.onText(/\/people/, async (msg) => {
    try {
      const response = await axios.get('https://api.lolhuman.xyz/api/random/people?apikey=dannlaina');
      const data = response.data.result;
      const message = `Berikut ini adalah hasil acak dari data orang:\n\nNama: ${data.name.title} ${data.name.first} ${data.name.last}\nJenis Kelamin: ${data.gender}\nAlamat: ${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.country}\nKoordinat: ${data.location.coordinates.latitude}, ${data.location.coordinates.longitude}\nZona waktu: ${data.location.timezone.offset} (${data.location.timezone.description})`;
      bot.sendMessage(msg.chat.id, message);
    } catch (error) {
      console.error(error);
      bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
};