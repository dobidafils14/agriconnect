const db = require("../config/db");

const Review = {
  create: (data, callback) => {
    db.query(
      "INSERT INTO reviews (user_id, product_id, note, commentaire) VALUES (?,?,?,?)",
      [data.user_id, data.product_id, data.note, data.commentaire],
      callback
    );
  },
  findByProduct: (productId, callback) => {
    const sql = `SELECT r.*, u.nom FROM reviews r JOIN users u ON r.user_id = u.id
                 WHERE r.product_id = ? ORDER BY r.created_at DESC`;
    db.query(sql, [productId], callback);
  }
};

module.exports = Review;