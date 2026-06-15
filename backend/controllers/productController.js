const Product = require("../models/Product");

const createProduct = (req, res) => {
  const { titre, description, prix, unite, quantite, categorie, telephone, imageUrl } = req.body;
  const image = req.file ? `/uploads/products/${req.file.filename}` : imageUrl || null;

  if (!titre || !prix || !categorie) {
    return res.status(400).json({ success: false, message: "Titre, prix et catégorie obligatoires." });
  }

  Product.create(
    { titre, description, prix, unite, quantite, categorie, image, user_id: req.user.id, telephone },
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.status(201).json({ success: true, message: "Produit publié.", productId: result.insertId });
    }
  );
};

const getProducts = (req, res) => {
  const { categorie } = req.query;
  Product.findAll(categorie, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
};

const getProductById = (req, res) => {
  Product.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!results.length) return res.status(404).json({ success: false, message: "Produit introuvable." });
    res.json({ success: true, data: results[0] });
  });
};

const getMyProducts = (req, res) => {
  Product.findByUser(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
};

const updateProduct = (req, res) => {
  const { titre, description, prix, unite, quantite, categorie, imageUrl } = req.body;
  const image = req.file ? `/uploads/products/${req.file.filename}` : imageUrl || null;
  Product.update(req.params.id, { titre, description, prix, unite, quantite, categorie, image, user_id: req.user.id },
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, message: "Produit mis à jour." });
    }
  );
};

const deleteProduct = (req, res) => {
  Product.delete(req.params.id, req.user.id, (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Produit supprimé." });
  });
};

const getMyStats = (req, res) => {
  Product.stats(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results[0] });
  });
};

const getGlobalStats = (req, res) => {
  Product.globalStats((err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results[0] });
  });
};

module.exports = { createProduct, getProducts, getProductById, getMyProducts, updateProduct, deleteProduct, getMyStats, getGlobalStats };