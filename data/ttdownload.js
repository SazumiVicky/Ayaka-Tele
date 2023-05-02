const fetch = require('node-fetch');

async function getTiktokVideoUrl(link) {
  const apiUrl = `https://api.lolhuman.xyz/api/tiktok?apikey=dannlaina&url=${link}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    if (result.status === 200) {
      const videoUrl = result.result;
      return videoUrl;
    } else {
      throw new Error('Maaf, terdapat kesalahan saat mengambil video dari link yang diberikan.');
    }
  } catch (error) {
    throw new Error('Maaf, terdapat kesalahan saat mengambil video dari link yang diberikan.');
  }
}