const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kalash@2002",
  database: "agriconnect",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Pool MySQL initialisé");

module.exports = db;