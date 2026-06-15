const express = require("express");
const router  = express.Router();
const upload  = require("../middlewares/uploadMiddleware");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile, changePassword, getAllUsers, deleteUser } = require("../controllers/userController");

router.get("/profile",          protect, getProfile);
router.put("/profile",          protect, upload.single("photo"), updateProfile);
router.put("/change-password",  protect, changePassword);
router.get("/all",              protect, adminOnly, getAllUsers);
router.delete("/:id",           protect, adminOnly, deleteUser);

module.exports = router;