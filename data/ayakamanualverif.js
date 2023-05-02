bot.onText(/\/verifikasi/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Silakan verifikasi identitas Anda dengan menekan tombol di bawah ini:", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Verifikasi Saya", callback_data: "verifikasi" }
          ]
        ]
      }
    });
  });
  
  bot.on("callback_query", (callbackQuery) => {
    const data = callbackQuery.data;
    const message = callbackQuery.message;
    if (data === "verifikasi") {
      const chatId = message.chat.id;
      const userId = message.from.id;
      bot.sendMessage(chatId, `Verifikasi berhasil! Pengguna dengan ID ${userId} telah terverifikasi.`);
    }
  });