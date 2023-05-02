const os = require('os');

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function osInfo() {
  const totalMemory = formatBytes(os.totalmem());
  const freemem = formatBytes(os.freemem());
  const platform = os.platform();
  const release = os.release();
  const uptime = os.uptime();
  const hostname = os.hostname();

  const rss = formatBytes(process.memoryUsage().rss);
  const heapTotal = formatBytes(process.memoryUsage().heapTotal);
  const external = formatBytes(process.memoryUsage().external);
  const heapUsed = formatBytes(process.memoryUsage().heapUsed);
  const arrayBuffers = formatBytes(process.memoryUsage().arrayBuffers);

  return `
  ℹ️ OS specs:
  • Total Memory: ${totalMemory}
  • Free Memory: ${freemem}
  • Platform: ${platform}
  • Release: ${release}
  • Uptime: ${uptime} seconds
  • Hostname: ${hostname}

  💻 Process specs:
  • RSS: ${rss}
  • Heap Total: ${heapTotal}
  • External: ${external}
  • Heap Used: ${heapUsed}
  • Array Buffers: ${arrayBuffers}

  🤖 Bot specs:
  • Bot Owner: Sazumi Viki
  • Bot Name: Ayaka Ai
  • Bot Version: 1.0.0
  • Bot Description: Ayaka Always Choose Viki
  `;
}

module.exports = {
  osInfo
}