const express = require("express");
const router  = express.Router();
const upload  = require("../middlewares/uploadMiddleware");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  createProduct, getProducts, getProductById,
  getMyProducts, updateProduct, deleteProduct,
  getMyStats, getGlobalStats
} = require("../controllers/productController");

router.get("/",              getProducts);
router.get("/mes-produits",  protect, getMyProducts);
router.get("/mes-stats",     protect, getMyStats);
router.get("/stats-globales",protect, adminOnly, getGlobalStats);
router.get("/:id",           getProductById);
router.post("/",             protect, upload.single("image"), createProduct);
router.put("/:id",           protect, upload.single("image"), updateProduct);
router.delete("/:id",        protect, deleteProduct);

module.exports = router;