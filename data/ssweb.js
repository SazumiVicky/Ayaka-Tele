const axios = require('axios');
const crypto = require('crypto');
const path = require('path');

function sswebHandler(bot) {
  bot.onText(/\/ssweb (.+)/, (msg, match) => {
    const url = match[1];
    const apiUrl = `https://api.lolhuman.xyz/api/ssweb?apikey=dannlaina&url=${encodeURIComponent(url)}`;
    const hash = crypto.createHash('md5').update(url).digest('hex');
    const photoUrl = `https://api.telegram.org/bot${bot.token}/sendPhoto`;

    axios.get(apiUrl, { responseType: 'arraybuffer' })
      .then(response => {
        const imageData = Buffer.from(response.data, 'binary');
        const ext = path.extname(url).toLowerCase();
        const contentType = `image/${ext === '.jpg' ? 'jpeg' : ext.substr(1)}`;
        const formData = {
          chat_id: msg.chat.id,
          photo: {
            value: imageData,
            options: {
              filename: `${hash}${ext}`,
              contentType: contentType
            }
          }
        };
        axios.post(photoUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .catch(error => {
            console.log(error);
            bot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan saat mengirim gambar.');
          });
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan saat mengambil screenshot.');
      });
  });

  bot.onText(/\/ssweb$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Masukkan link web yang ingin Anda ambil screenshotnya, contoh: /ssweb https://google.com');
  });
}

module.exports = { sswebHandler };