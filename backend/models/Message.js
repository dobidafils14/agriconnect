const db = require("../config/db");

const Message = {
  create: (data, callback) => {
    db.query(
      "INSERT INTO messages (sender_id, receiver_id, product_id, contenu) VALUES (?,?,?,?)",
      [data.sender_id, data.receiver_id, data.product_id, data.contenu],
      callback
    );
  },
  findByUser: (userId, callback) => {
    const sql = `SELECT m.*, u.nom AS expediteur, p.titre AS produit
                 FROM messages m
                 JOIN users u ON m.sender_id = u.id
                 LEFT JOIN products p ON m.product_id = p.id
                 WHERE m.receiver_id = ? ORDER BY m.created_at DESC`;
    db.query(sql, [userId], callback);
  }
};

module.exports = Message;