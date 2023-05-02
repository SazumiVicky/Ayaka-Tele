const { exec } = require('child_process');
// code by sazumi viki
function ayakaspeedtestHandler(bot) {
  bot.onText(/\/speedtest/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Sedang melakukan speedtest...').then((message) => {
      exec('speedtest -f json', (error, stdout, stderr) => {
        if (error) {
          bot.editMessageText(`Terjadi kesalahan saat menjalankan speedtest: ${error.message}`, {
            chat_id: chatId,
            message_id: message.message_id
          });
          return;
        }
        if (stderr) {
          bot.editMessageText(`Terjadi kesalahan saat menjalankan speedtest: ${stderr}`, {
            chat_id: chatId,
            message_id: message.message_id
          });
          return;
        }

        const result = JSON.parse(stdout);
        const downloadSpeed = (result.download.bandwidth / 1000000).toFixed(2);
        const uploadSpeed = (result.upload.bandwidth / 1000000).toFixed(2);
        const ping = result.ping.latency.toFixed(2);
        const ip = result.interface.externalIp;
        const hostname = result.server.name;

        bot.editMessageText(`
          Kecepatan download: ${downloadSpeed} Mbps
          Kecepatan upload: ${uploadSpeed} Mbps
          Ping: ${ping} ms
          IP Address: ${ip}
          Hostname: ${hostname}
        `, {
          chat_id: chatId,
          message_id: message.message_id
        });
      });
    });
  });
}

module.exports = {
  ayakaspeedtestHandler
};