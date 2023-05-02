const { spawn } = require('child_process');
// code by sazumi viki
function terminalHandler(bot) {
  bot.onText(/^\$ (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const command = match[1];

    if (msg.from.username !== 'sazumiviki') {  // ubah sesuai username telegram utama kamu
      bot.sendMessage(chatId, 'Maaf, perintah ini hanya dapat diakses oleh owner.');
      return;
    }

    if (!command) {
      bot.sendMessage(chatId, 'Maaf, perintah kosong tidak dapat diproses.');
      return;
    }

    const childProcess = spawn(command, { shell: true });

    let output = '';
    childProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
      bot.sendMessage(chatId, `Error: ${data.toString()}`);
    });

    childProcess.on('close', (code) => {
      if (code !== 0) {
        bot.sendMessage(chatId, `Command exited with code ${code}`);
      } else {
        output = output.trim();
        bot.sendMessage(chatId, `\`\`\`${output}\`\`\``, { parse_mode: 'Markdown' });
      }
    });
  });
}

module.exports = {
  terminalHandler
};