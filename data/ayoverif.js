const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

function generateVerifId(userId) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `viki-${userId}-${timestamp}-${random}`;
}

function ayoverifHandler(bot) {
  const DB_PATH = "./database.json";

  let database = {};
  if (fs.existsSync(DB_PATH)) {
    const data = fs.readFileSync(DB_PATH);
    database = JSON.parse(data);
  }

  bot.onText(/\/verifikasi/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Cek apakah pengguna sudah terverifikasi sebelumnya
    if (database[userId]) {
      bot.sendMessage(chatId, `Anda sudah terverifikasi sebelumnya dengan ID ${database[userId]}.`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Verifikasi Ulang", callback_data: "verif-ulang" },
              { text: "Hapus Verifikasi", callback_data: "delver" }
            ]
          ]
        }
      });
    } else {
      const verifId = generateVerifId(userId);
      bot.sendMessage(chatId, "Silakan verifikasi identitas Anda dengan menekan tombol di bawah ini:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Verifikasi Saya", callback_data: verifId }
            ]
          ]
        }
      });
    }
  });

  bot.on("callback_query", (callbackQuery) => {
    const data = callbackQuery.data;
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    const userId = callbackQuery.from.id;

    if (data === "verif-ulang") {
      // Hapus ID pengguna dari database
      delete database[userId];
      fs.writeFileSync(DB_PATH, JSON.stringify(database));

      const verifId = generateVerifId(userId);
      bot.sendMessage(chatId, "Silakan verifikasi identitas Anda dengan menekan tombol di bawah ini:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Verifikasi Saya", callback_data: verifId }
            ]
          ]
        }
      });
    } else if (data === "delver") {
      // Hapus ID pengguna dari database
      delete database[userId];
      fs.writeFileSync(DB_PATH, JSON.stringify(database));

      bot.sendMessage(chatId, "Verifikasi Anda telah dihapus dari database. Silakan verifikasi kembali dengan menekan tombol di bawah ini:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Verifikasi Saya", callback_data: generateVerifId(userId) }
            ]
          ]
        }
      });
    } else if (data.startsWith("viki-")) {
      const verifId = generateVerifId(userId);

      // Cek apakah pengguna sudah terverifikasi sebelumnya
      if (database[userId]) {
        bot.sendMessage(chatId, `Pengguna dengan ID ${database[userId]} sudah terverifikasi sebelumnya.`, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Verifikasi Ulang", callback_data: "verif-ulang" },
                { text: "Hapus Verifikasi", callback_data: "delver" }
              ]
            ]
          }
        });
      } else {
        // Tambahkan ID pengguna ke database
        database[userId] = verifId;
        fs.writeFileSync(DB_PATH, JSON.stringify(database));

        bot.sendMessage(chatId, `Verifikasi berhasil! Pengguna dengan ID ${verifId} telah terverifikasi dan disimpan di database.`, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Hapus Verifikasi", callback_data: "delver" }
              ]
            ]
          }
        });
      }
    }
  });
}

module.exports = {
  ayoverifHandler
};