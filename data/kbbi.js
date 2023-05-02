const axios = require('axios');

function kbbiHandler(bot, msg) {
  const command = msg.text ? msg.text.toLowerCase() : '';

  if (command.startsWith('/kbbi ')) {
    const query = command.slice(6);
    const apiUrl = `https://api.lolhuman.xyz/api/kbbi?apikey=dannlaina&query=${query}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;

        let message = '';

        if (data.status === 200) {
          const result = data.result[0];
          const nama = result.nama;
          const makna = result.makna;

          message = `📖 *${nama}*\n\n`;

          for (let i = 0; i < makna.length; i++) {
            const kelas = makna[i].kelas[0].nama;
            const submakna = makna[i].submakna.join(', ');
            const contoh = makna[i].contoh;

            message += `_${kelas}_\n${submakna}\n`;

            if (contoh.length > 0) {
              message += `Contoh: ${contoh.join(', ')}\n`;
            }

            message += '\n';
          }
        } else {
          message = `*Status*: ${data.status}\n*Message*: ${data.message}`;
        }

        bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat melakukan pencarian di KBBI.');
      });
  } else if (command === '/kbbi') {
    bot.sendMessage(msg.chat.id, 'Masukan kata yang ingin Anda cek, Contoh: /kbbi ksabar');
  }
}

module.exports = function(bot) {
  bot.on('message', (msg) => {
    kbbiHandler(bot, msg);
  });
};