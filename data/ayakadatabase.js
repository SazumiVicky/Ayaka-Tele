const fs = require('fs');

const DB_FILE = 'database.json';

function loadDatabase() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`File ${DB_FILE} tidak ditemukan. Membuat file baru...`);
      saveDatabase({});
      return {};
    }
    throw error;
  }
}

function saveDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function addUser(id, data) {
  const db = loadDatabase();
  db[id] = data;
  saveDatabase(db);
}

function getUser(id) {
  const db = loadDatabase();
  return db[id];
}

module.exports = { addUser, getUser };