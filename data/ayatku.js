const fetch = require('node-fetch');

function handleAyatCommand(bot) {
  bot.onText(/\/ayat(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const surahNumber = match[1].trim();

    if (!surahNumber) {
      bot.sendMessage(chatId, 'Masukan ayat, Contoh: /ayat 1');
      return;
    }

    const apiUrl = `https://api.lolhuman.xyz/api/quran/${surahNumber}/1?apikey=dannlaina`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 200) {
        const result = data.result;
        const audioUrl = result.audio;

        // Send audio
        const audioResponse = await fetch(audioUrl);
        const audioBuffer = await audioResponse.buffer();
        bot.sendAudio(chatId, audioBuffer);

        // Send text
        const description = `Ayat: ${result.nomor}\nAsma: ${result.asma}\nSurah: ${result.surah}\nJumlah Ayat: ${result.jumlah_ayat}\nType: ${result.type}\nKeterangan: ${result.keterangan}`;
        const ayatList = result.ayat.map((ayat) => {
          return `\nAyat: ${ayat.ayat}\nArab: ${ayat.arab}\nIndonesia: ${ayat.indonesia}\nLatin: ${ayat.latin}`;
        });
        bot.sendMessage(chatId, `${description}${ayatList}`, { parse_mode: 'HTML' });
      } else {
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
  });
}

module.exports = {
  handleAyatCommand
};