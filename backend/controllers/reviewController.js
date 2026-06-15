const Review = require("../models/Review");

const addReview = (req, res) => {
  const { product_id, note, commentaire } = req.body;
  if (!product_id || !note) {
    return res.status(400).json({ success: false, message: "Produit et note obligatoires." });
  }
  Review.create({ user_id: req.user.id, product_id, note, commentaire }, (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Avis ajouté." });
  });
};

const getReviews = (req, res) => {
  Review.findByProduct(req.params.productId, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
};

module.exports = { addReview, getReviews };