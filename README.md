<p>Ayaka Tele adalah sebuah bot Telegram yang ditulis dengan menggunakan bahasa pemrograman JavaScript, Bot ini memanfaatkan library node-telegram-bot-api untuk berinteraksi dengan API Telegram.

Ayaka Tele dapat memproses berbagai perintah dan memberikan respons kepada pengguna Telegram, seperti mengirim pesan, membalas pesan, Bot ini juga dilengkapi dengan fitur-fitur yang berguna, seperti menampilkan informasi tentang COVID-19, ChatGPT, Mendownload Audio, Video, Profile dari Tik Tok, dan masih banyak lagi.

Seluruh kode sumber "Ayaka Tele" tersedia di repositori GitHub dan dapat diakses secara gratis. Selain itu, repositori ini juga menyediakan dokumentasi dan panduan penggunaan bot ini. Anda juga dapat berkontribusi ke repositori ini dengan menambahkan fitur baru atau memperbaiki masalah yang ada di dalamnya.</p>

##

<h5> Cara Menggunakan Ayaka Tele</h5>

<p><b>1.</b> Buka aplikasi Telegram dan cari akun <b>@BotFather</b>. Ini adalah bot resmi Telegram yang akan membantu Anda membuat bot baru.</p>



<p><b>2.</b> Mulai obrolan dengan <b>@BotFather</b> dan ketik perintah /newbot. BotFather akan meminta Anda untuk memberikan nama untuk bot Anda. Setelah itu, BotFather akan memberikan Anda token akses yang unik untuk bot Anda. Simpan token ini karena Anda akan menggunakannya nanti.</p>



<p> <b>3.</b> Clone script yang telah saya sediakan di atas</p>

```
$ git clone https://github.com/SazumiVicky/Ayaka-Tele
```



<p><b>4.</b> Setelah menginstall script nya, pastikan Anda telah menginstall module nya, agar script bisa berjalan, untuk menginstall module nya, masukan perintah berikut ke terminal / cmd Anda.</p>

```
$ npm install
```
<p><b>5.</b> Lalu pastikan juga, bahwa Anda sudah memasukan token bot Anda pada file <code>.env</code> pada direktori berikut:</p>

```yaml
> data
> image
> .env
> README.md
> ayakaverif.json.json
> bot.pid
> database.json
> install.sh
> package-lock.json
> package.json
> update.MD
> viki.js
> viki.text
```
<p><b>6.</b> Lalu ubah token nya menjadi Token bot yang Anda peroleh dari <b>@BotFather</b> tadi:
  
```
TELEGRAM_BOT_TOKEN=YOUR_TOKEN_HERE
```
  
<p><b>7.</b> Pada kode yang telah saya beri comment, Adalah kode yang belum saya sempurnakan, contoh:
  
```javascript
> require('./data/bpurba');
  
> const { showMenu } = require('./data/menu');
  
> const { helloAyakaHandler } = require('./data/helloayaka');
helloAyakaHandler(bot);
```
<p><b>8.</b> Data yang terdapat pada <code>database.json</code> adalah data yang di simpan dari verifikasi data Anda pada bot, ketika anda mengirimkan perintah <code>/verifikasi</code>, maka bot akan menyimpan data Anda pada <code>database.json</code>

```json
{"1626893657":"viki-1626893657-1682415085687-360","[object Object]":1626893657,"5941228478":"viki-5941228478-1682328941731-180"}
```
<p><b>9.</b> Dan jalankan bot Anda dengan memasukan perintah:</p>

```
$ node viki
```

<b>Contributor:</b>

- Viki
- Kamisato Ayaka
- Sazumi Backup
