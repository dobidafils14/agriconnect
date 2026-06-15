const db = require("../config/db");

const User = {
  // Créer un utilisateur
  create: (data, callback) => {
    const sql = `
      INSERT INTO users
      (nom, email, password, role, telephone)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        data.nom,
        data.email,
        data.password,
        data.role,
        data.telephone
      ],
      callback
    );
  },

  // Rechercher par email
  findByEmail: (email, callback) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      callback
    );
  },

  // Rechercher par ID
  findById: (id, callback) => {
    db.query(
      "SELECT id, nom, email, role, telephone, photo, created_at FROM users WHERE id = ?",
      [id],
      callback
    );
  },

  // Mettre à jour le mot de passe
  updatePassword: (email, password, callback) => {
    db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [password, email],
      callback
    );
  },

  // Mettre à jour le profil
  updateProfile: (id, data, callback) => {
    const sql = `
      UPDATE users
      SET nom = ?, telephone = ?, photo = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        data.nom,
        data.telephone,
        data.photo,
        id
      ],
      callback
    );
  }
};

module.exports = User;