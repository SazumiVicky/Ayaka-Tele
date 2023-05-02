require('dotenv').config();

//  require('./data/bpurba');


const TelegramBot = require('node-telegram-bot-api');
//  const { showMenu } = require('./data/menu');
const { sendMusic } = require('./data/automusic');
const fs = require('fs');


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { 
  polling: true,
  suppressDeprecationWarnings: true
});

const { addUser, getUser } = require('./data/ayakadatabase');

const { osInfo } = require('./data/os');

// Handle Telegram messages here
bot.on('message', (message) => {
  if (message.text === '/os') {
    const osInfoString = osInfo();
    bot.sendMessage(message.chat.id, osInfoString);
  }
});

//lirik
const lirikHandler = require('./data/lirik');
lirikHandler(bot);

//spamcall
const spamCallHandler = require('./data/spamcall');
spamCallHandler(bot);

//storynime
const storynimeHandler = require('./data/storynime');
storynimeHandler(bot);

//ttprofile
const tiktokProfileHandler = require('./data/ttprofile');
tiktokProfileHandler(bot);

//ttmp4
const tiktokVideoHandler = require('./data/ttmp4');
tiktokVideoHandler(bot);

//ttmp3
const tiktokMusicHandler = require('./data/ttmp3');
tiktokMusicHandler(bot);

//attp
const attpHandler = require('./data/attp');
attpHandler(bot);

//doujindesu
const doujinDesu = require('./data/doujindesu');
doujinDesu(bot);

//kbbi
const kbbi = require('./data/kbbi');
kbbi(bot);

//cekapikey
const cekapikey = require('./data/cekapikey');
cekapikey(bot);

//superhero
const superhero = require('./data/superhero');
superhero(bot);

//corona
const corona = require('./data/corona');
corona(bot);

//pin
const pinHandler = require('./data/pin');
pinHandler(bot);

//runtime
const runtimeHandler = require('./data/runtime');
runtimeHandler(bot);

//verifdulu
const handleVerification = require('./data/verifdulu');
handleVerification(bot);

//stalkig
const stalkigHandler = require('./data/stalkig');
stalkigHandler(bot);

//hextosting
const hexToStringHandler = require('./data/hextostring');
hexToStringHandler(bot);

//stringtohex
const stringToHexHandler = require('./data/stringtohex');
stringToHexHandler(bot);

//morse
const morseHandler = require('./data/morse');
morseHandler(bot);

//people
const peopleHandler = require('./data/people');
peopleHandler(bot);

//nekopoi
const { handleNekopoiCommand } = require('./data/nekopoi');
handleNekopoiCommand(bot);


//ayatku
const { handleAyatCommand } = require('./data/ayatku')
handleAyatCommand(bot);

//randomblackpink
const { handleRandomBlackpinkCommand } = require('./data/randomblackpink');
handleRandomBlackpinkCommand(bot);

//doujinsearch
const { handleDoujinSearchCommand } = require('./data/doujinsearch');
handleDoujinSearchCommand(bot);


//asupan
const { handleAsupanCommand } = require('./data/asupan');
handleAsupanCommand(bot);

//artinama
const { handleArtiNamaCommand } = require('./data/artinama');
handleArtiNamaCommand(bot);


//infocuaca
const Infocuaca = require('./data/infocuaca');
Infocuaca(bot);

//infogempa
const Infogempa = require('./data/infogempa');
Infogempa(bot);


//pixiv
const { handlePixivCommand } = require('./data/pixiv');
handlePixivCommand(bot);


//randomimage
const { handleGImageCommand } = require('./data/gimage');
handleGImageCommand(bot);

//pantun
const { handlePantunCommand } = require('./data/pantun');
handlePantunCommand(bot);

//faktaunik
const { handleFaktaUnikCommand } = require('./data/faktaunik');
handleFaktaUnikCommand(bot);

//namarandom
const { handleNamaRandomCommand } = require('./data/namarandom');
handleNamaRandomCommand(bot);

//detiknews
const { handleDetikNewsCommand } = require('./data/detik');
bot.onText(/\/detik/, (msg) => {
  handleDetikNewsCommand(bot, msg);
});

//chatgpt
const { handleOpenAICommand } = require('./data/chatgpt');
handleOpenAICommand(bot);

//wikipedia
const wikipedia = require('./data/wikipedia');
wikipedia.handleWikiCommand(bot);

//ssweb
const { sswebHandler } = require('./data/ssweb');
sswebHandler(bot);

//simisimi
const { simiHandler } = require('./data/simisimi');
simiHandler(bot);

//roboguru
const { roboguruHandler } = require('./data/roboguru');
roboguruHandler(bot);

//quotesnime
const { quotesAnimeHandler } = require('./data/quotesnime');
quotesAnimeHandler(bot);

//proxysite
const { proxySiteHandler } = require('./data/proxysite');
proxySiteHandler(bot);

//katabijak
const { katabijakHandler } = require('./data/katabijak');
katabijakHandler(bot);

//ceritahoror
const { ceritaHororHandler } = require("./data/ceritahoror");
ceritaHororHandler(bot);

//caklontong
const { ayakacaklontongHandler } = require("./data/ayakacaklontong");
ayakacaklontongHandler(bot);

//ayoverif
const { ayoverifHandler } = require('./data/ayoverif');
ayoverifHandler(bot);

const { ayakarestartHandler } = require('./data/ayakarestart');
ayakarestartHandler(bot);

const { ayakarefreshHandler } = require('./data/ayakarefresh');
ayakarefreshHandler(bot);

//ayakareport
const { ayakareportHandler } = require('./data/ayakareport');
ayakareportHandler(bot);

//ayakatube
const { ayakatubeHandler } = require('./data/ayakatube');
ayakatubeHandler(bot);

//ayakadonasi
const { ayakadonasiHandler } = require('./data/ayakadonasi');
ayakadonasiHandler(bot);

//speedtest
const { ayakaspeedtestHandler } = require('./data/speedtest');
ayakaspeedtestHandler(bot);

//ayakaspam
const { ayakaspamHandler } = require('./data/ayakaspam');
ayakaspamHandler(bot);

//rulesayaka
const { ayakarulesHandler } = require('./data/ayakarules');
ayakarulesHandler(bot);

//monitorayaka
const { monitorayakaHandler } = require('./data/monitorayaka');
monitorayakaHandler(bot);

const { terminalHandler } = require('./data/terminal'); 
terminalHandler(bot);

//listme
const { listMeHandler } = require('./data/listme');
listMeHandler(bot);

//calowner
/**const { callOwnerHandler } = require('./data/callowner');
callOwnerHandler(bot);

**/

//owner
const { ownerHandler } = require('./data/owner');
ownerHandler(bot);

//sourcecode
const { sourceHandler } = require('./data/source');
sourceHandler(bot);

/*
//helloayaka
const { helloAyakaHandler } = require('./data/helloayaka');
helloAyakaHandler(bot);
*/


//passwordg
const { passwordHandler } = require('./data/passwordg');
passwordHandler(bot);

//Ipayaka
const { ipInfoHandler } = require('./data/ipinfo');
ipInfoHandler(bot);

//Badword
const { badwordHandler } = require('./data/badword');
const { Body } = require('node-fetch');
const morse = require('./data/morse');
badwordHandler(bot);


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Tunggu sebentar, Ayaka sedang memuat..');
  
  const photoUrl = 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/510e37bebbf7a780e7ade93a66f268ff.jpg';
  const caption = `Halo kak ${msg.from.first_name}! ada yang bisa Ayaka bantu ? Untuk memulai sebaiknya kamu /verifikasi dulu yah, agar Ayaka ga lupa sama kamu.`;
  bot.sendPhoto(chatId, photoUrl, { caption: caption });

  const musicPath = './data/sound/viki_sound.mp3';
  if (fs.existsSync(musicPath)) {
    sendMusic(bot, chatId, musicPath);
  } else {
    bot.sendMessage(chatId, 'Maaf, file musik tidak ditemukan.');
  }
});

//bot.onText(/\/menu/, (msg) => { 
//  showMenu(bot, msg);
//});

const message = `
\x1b[36m░█████╗░██╗░░░██╗░█████╗░██╗░░██╗░█████╗░\x1b[0m
\x1b[36m██╔══██╗╚██╗░██╔╝██╔══██╗██║░██╔╝██╔══██╗\x1b[0m
\x1b[36m███████║░╚████╔╝░███████║█████═╝░███████║\x1b[0m
\x1b[36m██╔══██║░░╚██╔╝░░██╔══██║██╔═██╗░██╔══██║\x1b[0m
\x1b[36m██║░░██║░░░██║░░░██║░░██║██║░╚██╗██║░░██║\x1b[0m
\x1b[36m╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝\x1b[0m
Ayaka Always Choose Viki
`;

console.log(message);


bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Ini adalah bantuan bot Telegram.');
});

bot.on('message', (msg) => {
  if (msg.from.username === bot.options.username) {
    return;
  }

  const { id: chatId, username, first_name: firstName, last_name: lastName } = msg.from;
  const userData = getUser(chatId);

  if (!userData) {
    addUser(bot, chatId, {
      id: chatId,
      username,
      firstName,
      lastName
    });
  }
});

function viki() {
  console.log('Ayaka smart tele sedang berjalan...');
}

viki();

bot.onText(/\/music/, (msg) => {
  const chatId = msg.chat.id;
  const musicPath = './data/sound/viki_sound.mp3';
  if (fs.existsSync(musicPath)) {
    sendMusic(bot, chatId, musicPath);
  } else {
    bot.sendMessage(chatId, 'Maaf, file musik tidak ditemukan.');
  }
});

bot.on('polling_error', (error) => {
  console.log(`Polling error: ${error}`);
});