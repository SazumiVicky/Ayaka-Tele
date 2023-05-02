const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');

const downloadFile = promisify(fs.writeFile);

module.exports = (bot) => {
  bot.onText(/ig (.+)/, async (msg, match) => {
    const username = match[1];
    try {
      const response = await axios.get(`https://api.lolhuman.xyz/api/stalkig/${encodeURIComponent(username)}?apikey=dannlaina`);
      const data = response.data.result;

      let message = `Berikut adalah data profil Instagram untuk @${data.username}:\nNama: ${data.fullname}`;

      if (data.post_count !== undefined) {
        message += `\nPost: ${data.post_count}`;
      }

      if (data.follower !== undefined) {
        message += `\nFollower: ${data.follower}`;
      }

      if (data.following !== undefined) {
        message += `\nFollowing: ${data.following}`;
      }

      if (data.bio !== undefined) {
        message += `\nBio: ${data.bio}`;
      }

      if (data.profile_pic_url_hd !== undefined) {
        const photoUrl = data.profile_pic_url_hd;
        const photoBuffer = await axios.get(photoUrl, { responseType: 'arraybuffer' });
        await downloadFile(`${username}.jpg`, photoBuffer.data);
        bot.sendPhoto(msg.chat.id, `${username}.jpg`, { caption: message });
        fs.unlinkSync(`${username}.jpg`);
      } else {
        bot.sendMessage(msg.chat.id, message);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        bot.sendMessage(msg.chat.id, 'Profil Instagram tidak ditemukan.');
      } else {
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memproses permintaan Anda.');
      }
    }
  });

  bot.onText(/\/ig$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Masukan username, Contoh: /ig moe.sazumiviki');
  });
};