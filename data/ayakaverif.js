const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const redis = require('redis');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const redisClient = redis.createClient();

// Fungsi untuk mengirim email verifikasi ke alamat email yang diberikan pengguna
function sendVerificationEmail(email, verificationCode) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password'
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Verifikasi Email untuk Bot Telegram',
    text: `Kode verifikasi Anda adalah ${verificationCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email terkirim: ' + info.response);
    }
  });
}

// Fungsi untuk memeriksa apakah pengguna telah diverifikasi
function checkVerification(req, res, next) {
  const userId = req.body.user_id;

  redisClient.get(userId, (err, data) => {
    if (err) throw err;

    if (data === 'true') {
      next();
    } else {
      res.send('Silakan verifikasi email Anda terlebih dahulu');
    }
  });
}

// Halaman pendaftaran
app.get('/register', (req, res) => {
  res.send(`
    <form method="POST" action="/send-verification">
      <input type="email" name="email" required>
      <button type="submit">Kirim Kode Verifikasi</button>
    </form>
  `);
});

// Fungsi untuk menangani pengiriman email verifikasi
app.post('/send-verification', (req, res) => {
  const email = req.body.email;
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate kode verifikasi acak

  // Simpan kode verifikasi di database Redis
  redisClient.set(email, verificationCode);

  // Kirim email verifikasi ke alamat email yang diberikan pengguna
  sendVerificationEmail(email, verificationCode);

  res.send('Kode verifikasi telah dikirim ke alamat email Anda');
});

// Halaman verifikasi
app.get('/verify', (req, res) => {
  res.send(`
    <form method="POST" action="/verify-email">
      <input type="text" name="verification_code" required>
      <input type="hidden" name="user_id" value="${req.query.user_id}">
      <button type="submit">Verifikasi</button>
    </form>
  `);
});

// Fungsi untuk menangani verifikasi email
app.post('/verify-email', (req, res) => {
  const userId = req.body.user_id;
  const verificationCode = req.body.verification_code;

  // Ambil kode verifikasi dari database Redis
  redisClient.get(userId, (err, data) => {
    if (err) throw err;

    if (data === verificationCode) {
      // Jika kode verifikasi cocok, ubah status verifikasi pengguna menjadi true
      redisClient.set(userId, 'true');
      res.send('Email Anda berhasil diverifikasi');
    } else {
      res.send('Kode verifikasi salah');
    }
  });
});

// Middleware untuk memeriksa apakah pengguna telah diverifikasi
app.use(checkVerification);

// Contoh penggunaan middleware
app.post('/pesan-rahasia', (req, res) => {
  res.send('Ini adalah pesan rahasia yang hanya dapat diakses oleh pengguna yang telah diverifikasi');
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});

module.exports = app;