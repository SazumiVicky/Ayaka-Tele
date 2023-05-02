const axios = require('axios');
const { TELEGRAM_BOT_TOKEN } = process.env;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/bpurba/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match.input.split(' ')[1];
  if (!text) {
    return bot.sendMessage(chatId, 'Silakan masukkan teks yang ingin diubah ke bahasa purba.');
  }
  try {
    const response = await axios.get(`https://api.lolhuman.xyz/api/bahasapurba?apikey=dannlaina&text=${encodeURIComponent(text)}`);
    bot.sendMessage(chatId, response.data.result);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Terjadi kesalahan saat memproses permintaan Anda.');
  }
});