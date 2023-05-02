const TelegramBot = require('node-telegram-bot-api');

// code by sazumi viki
function showMenu(bot, msg) {
  const chatId = msg.chat.id;
  const menu = `Berikut ini adalah command yang tersedia di Ayaka Ai:
/start -  go
/ai - openai
/menu - go
/owner - owner
/ceritahororr - fun
/bpurba - Bahasa Purba (MT)
/refresh - owner
/$ - advanced owner
/restart - owner
/ssweb - tool
/detiknews - news
/faktaunik - info
/source - code
/verifikasi - user
/katabijak - fun
/proxy - tool
/namarandom - fun
/pixiv - fun
/infogempa - info
/infocuaca - info
/simi - fun
/gimage - fun
/pantun - fun
/roboguru - tool
/wiki - tool
/quotesanime - fun
/caklontong - games
/password - tool
/nekopoi -  fun (MT)
/help - bantuan`;
  bot.sendMessage(chatId, `Halo kak ${msg.from.first_name}, ${menu}`);
}

module.exports = {
  showMenu,
};