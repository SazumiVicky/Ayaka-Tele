const axios = require('axios');

// code by sazumi viki

async function getIpInfo(ip) {
  const url = `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.status === 'success') {
      const message = `IP Address: ${data.query}\nLocation: ${data.city}, ${data.regionName}, ${data.country}\nISP: ${data.isp}\nAS: ${data.as}`;
      return message;
    } else {
      return data.message;
    }
  } catch (error) {
    console.error(error);
    return 'Oops, something went wrong!';
  }
}

function ipInfoHandler(bot) {

  bot.onText(/\/ipayaka/, async (msg) => {
    const chatId = msg.chat.id;
    const ip = msg.from?.ip || msg.from?.address || msg.from?.username;
    if (ip) {
      const message = await getIpInfo(ip);
      bot.sendMessage(chatId, message);
    } else {
      bot.sendMessage(chatId, 'Oops, IP address not found!');
    }
  });
}

module.exports = {
  ipInfoHandler
};