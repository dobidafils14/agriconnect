const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Kalash@2002",
  database: "agriconnect",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("ERREUR MYSQL :", err);
  } else {
    console.log("✅ Connexion MySQL locale réussie !");
    connection.release();
  }
});

console.log("Pool MySQL initialisé");

module.exports = db;