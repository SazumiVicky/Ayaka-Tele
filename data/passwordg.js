function generatePassword(length = 12) {
    // code by sazumi viki
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let password = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * charset.length);
      password += charset[index];
    }
    return password;
  }
  
  function passwordHandler(bot) {

    bot.onText(/\/password/, (msg) => {
      const chatId = msg.chat.id;
      const password1 = generatePassword();
      const password2 = generatePassword();
      const password3 = generatePassword();
      const message = `Ini beberapa password yang aman untuk kamu gunakan:\n\n${password1}\n${password2}\n${password3}`;
      bot.sendMessage(chatId, message);
    });
  }
  
  module.exports = {
    passwordHandler
  };