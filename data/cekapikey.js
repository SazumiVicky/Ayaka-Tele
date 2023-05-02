const axios = require('axios');

function cekapikeyHandler(bot, msg) {
  const command = msg.text ? msg.text.toLowerCase() : '';

  if (command === '/cekapikey') {
    bot.sendMessage(msg.chat.id, 'Masukan api key yang ingin Anda cek, Contoh: /cekapikey ayaka');
  } else if (command.startsWith('/cekapikey ')) {
    const apiKey = command.split(' ')[1];
    const apiUrl = `https://api.lolhuman.xyz/api/checkapikey?apikey=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;

        let message = '';

        if (data.status === 200) {
          const result = data.result;
          message = `✅ *Status*: ${data.status}\n📝 *Message*: ${data.message}\n👤 *Username*: ${result.username}\n🔑 *Requests*: ${result.requests}\n📅 *Today*: ${result.today}\n💳 *Account Type*: ${result.account_type}\n⏰ *Expired*: ${result.expired}`;
        } else {
          message = `❌ *Status*: ${data.status}\n📝 *Message*: ${data.message}`;
        }

        bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat melakukan pengecekan API key.');
      });
  }
}

module.exports = function(bot) {
  bot.on('message', (msg) => {
    cekapikeyHandler(bot, msg);
  });
};