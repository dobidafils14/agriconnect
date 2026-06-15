const db = require("../config/db");

const Product = {
  create: (data, callback) => {
    const sql = `INSERT INTO products
      (titre, description, prix, unite, quantite, categorie, image, user_id, telephone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
      data.titre,
      data.description,
      data.prix,
      data.unite,
      data.quantite,
      data.categorie,
      data.image,
      data.user_id,
      data.telephone
    ], callback);
  },

  findAll: (categorie, callback) => {
    let sql = `
      SELECT
        p.*,
        u.nom AS vendeur,
        u.telephone,
        u.photo AS vendeur_photo
      FROM products p
      JOIN users u ON p.user_id = u.id
    `;

    const params = [];

    if (categorie) {
      sql += " WHERE p.categorie = ?";
      params.push(categorie);
    }

    sql += " ORDER BY p.created_at DESC";

    db.query(sql, params, callback);
  },

  findById: (id, callback) => {
    const sql = `
      SELECT
        p.*,
        u.nom AS vendeur,
        u.telephone,
        u.email AS vendeur_email,
        u.photo AS vendeur_photo
      FROM products p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `;

    db.query(sql, [id], callback);
  },

  findByUser: (userId, callback) => {
    db.query(
      "SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      callback
    );
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE products
      SET titre=?, description=?, prix=?, unite=?,
          quantite=?, categorie=?, image=?
      WHERE id=? AND user_id=?
    `;

    db.query(sql, [
      data.titre,
      data.description,
      data.prix,
      data.unite,
      data.quantite,
      data.categorie,
      data.image,
      id,
      data.user_id
    ], callback);
  },

  delete: (id, userId, callback) => {
    db.query(
      "DELETE FROM products WHERE id = ? AND user_id = ?",
      [id, userId],
      callback
    );
  },

  stats: (userId, callback) => {
    const sql = `
      SELECT
        COUNT(*) AS total_produits,
        SUM(quantite) AS total_stock,
        COUNT(CASE WHEN categorie='agriculture' THEN 1 END) AS total_agriculture,
        COUNT(CASE WHEN categorie='elevage' THEN 1 END) AS total_elevage
      FROM products
      WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);
  },

  globalStats: (callback) => {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM products) AS total_products,
        (SELECT COUNT(*) FROM users WHERE role='producteur') AS total_producteurs,
        (SELECT COUNT(*) FROM users WHERE role='acheteur') AS total_acheteurs
    `;

    db.query(sql, callback);
  }
};

module.exports = Product;