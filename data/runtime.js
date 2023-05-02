function formatDuration(duration) {
    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor((duration / 60) % 60);
    const hours = Math.floor((duration / (60 * 60)) % 24);
  
    const durationString = [];
  
    if (hours > 0) {
      durationString.push(`${hours} jam`);
    }
  
    if (minutes > 0) {
      durationString.push(`${minutes} menit`);
    }
  
    durationString.push(`${seconds} detik`);
  
    return durationString.join(', ');
  }
  
  function runtimeHandler(bot, msg) {
    const uptime = process.uptime();
    const durationString = formatDuration(uptime);
  
    const response = `Bot telah aktif selama ${durationString}.`;
    bot.sendMessage(msg.chat.id, response);
  }
  
  module.exports = function(bot) {
    bot.onText(/\/runtime/, (msg) => {
      runtimeHandler(bot, msg);
    });
  };