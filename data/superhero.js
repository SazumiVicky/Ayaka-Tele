const axios = require('axios');

function superheroHandler(bot, msg) {
  const command = msg.text ? msg.text.toLowerCase() : '';

  if (command.startsWith('/superhero ')) {
    const superheroName = command.substring('/superhero '.length).trim();
    const apiUrl = `https://api.lolhuman.xyz/api/superhero?apikey=dannlaina&query=${superheroName}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data.result;
        const message = `• 🦸‍♂️ ${data.name}\n\n• 🏷️ Full Name: ${data.biography['full-name']}\n• 👤 Alter-egos: ${data.biography['alter-egos']}\n• 👥 Aliases: ${data.biography.aliases.join(", ")}\n• 🌍 Place of Birth: ${data.biography['place-of-birth']}\n• 📅 First Appearance: ${data.biography['first-appearance']}\n• 📚 Publisher: ${data.biography.publisher}`;

        bot.sendPhoto(msg.chat.id, data.image.url, { caption: message });
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat mengambil data superhero.');
      });
  } else if (command === '/superhero') {
    bot.sendMessage(msg.chat.id, 'Masukkan nama superhero, Contoh: /superhero hulk');
  }
}

module.exports = function(bot) {
  bot.on('message', (msg) => {
    superheroHandler(bot, msg);
  });
};