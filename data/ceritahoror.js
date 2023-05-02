const axios = require("axios");

async function ceritaHororHandler(bot) {
  bot.onText(/\/ceritahororr|\/hororr/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, "Ayaka sedang memuat, tunggu sebentar..");

      const response = await axios.get("https://api.lolhuman.xyz/api/ceritahoror?apikey=dannlaina");
      const result = response.data.result;
      console.log("Nilai dari response.data.result:", result);
      if (!result) {
        throw new Error("Data yang diterima dari API tidak valid.");
      }
      if (result.image) {
        const imageUrl = result.image;
        const imageResponse = await axios.get(imageUrl, {
          responseType: "arraybuffer"
        });
        const imageBuffer = Buffer.from(imageResponse.data, "binary");
        await bot.sendPhoto(chatId, imageBuffer, { caption: result.title });
      }
      if (result.thumbnail) {
        const thumbnailUrl = result.thumbnail;
        const thumbnailResponse = await axios.get(thumbnailUrl, {
          responseType: "arraybuffer"
        });
        const thumbnailBuffer = Buffer.from(thumbnailResponse.data, "binary");
        await bot.sendPhoto(chatId, thumbnailBuffer, { caption: result.title });
      }
      if (result.story) {
        const message = result.story;

        // Escape karakter-karakter yang tidak dapat diproses oleh Telegram
        const escapedMessage = message.replace(/[\*\_\[\]\(\)\~\`\>\#\+\-\=\|\{\}\.\!]/g, "\\$&");

        const options = {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        };
        await bot.sendMessage(chatId, escapedMessage, options);
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "Terjadi kesalahan pada sistem. Silakan coba lagi nanti.");
    }
  });
}

module.exports = {
  ceritaHororHandler,
};