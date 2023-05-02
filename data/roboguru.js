const axios = require('axios');

function roboguruHandler(bot) {
  bot.onText(/\/roboguru (.+)/, (msg, match) => {
    const question = match[1];
    const query = encodeURIComponent(question);
    const grade = 'sma'; // ganti dengan tingkat pendidikan yang diinginkan
    const subject = 'sejarah'; // ganti dengan mata pelajaran yang diinginkan
    const apiUrl = `https://api.lolhuman.xyz/api/roboguru?apikey=dannlaina&query=${query}&grade=${grade}&subject=${subject}`;
    axios.get(apiUrl)
      .then(response => {
        const answer = response.data.result;
        let answerString = '';
        answer.forEach((qa, index) => {
          answerString += `${index+1}. <b>${qa.question}</b>\n${qa.answer}\n\n`;
        });
        const answerChunks = answerString.match(/[\s\S]{1,1000}/g); // membagi pesan balasan menjadi bagian-bagian dengan panjang maksimum 1000 karakter
        answerChunks.forEach(chunk => {
          bot.sendMessage(msg.chat.id, `Jawaban dari pertanyaan <i>"${question}"</i> adalah:\n\n${chunk}`, { parse_mode: 'HTML' });
        });
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(msg.chat.id, 'Maaf, Ayaka tidak menemukan jawaban yang kamu cari.');
      });
  });

  bot.onText(/\/roboguru$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Masukkan pertanyaan yang ingin Anda cari jawabannya, contoh: /roboguru siapa itu Sazumi Viki');
  });
}

module.exports = { roboguruHandler };