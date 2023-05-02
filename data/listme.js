const { spawn } = require('child_process');
const isWindows = process.platform === 'win32';

function listMeHandler(bot) {
  // fungsi ini akan dipanggil ketika user mengirimkan pesan "$ ls"
  bot.onText(/^\$ ls$/, (msg) => {
    const chatId = msg.chat.id;
    const command = isWindows ? 'cmd' : 'ls'; // menentukan perintah yang sesuai dengan sistem operasi
    const args = isWindows ? ['/c', 'dir'] : ['-la']; // menentukan argumen yang sesuai dengan sistem operasi
    const ls = spawn(command, args); // menjalankan perintah
    let output = '';

    // menangani output dari perintah
    ls.stdout.on('data', (data) => {
      output += data.toString();
    });

    // menangani error dari perintah
    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    // menangani penyelesaian perintah
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      bot.sendMessage(chatId, `\`\`\`${output}\`\`\``, { parse_mode: 'Markdown' }); // mengirimkan output ke Telegram
    });
  });
}

module.exports = {
  listMeHandler
};