const db     = require("../config/db");
const bcrypt = require("bcryptjs");

const getProfile = (req, res) => {
  db.query(
    "SELECT id, nom, email, role, telephone, photo FROM users WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, data: results[0] });
    }
  );
};

const updateProfile = (req, res) => {
  const { nom, telephone } = req.body;
  const photo = req.file ? `/uploads/profiles/${req.file.filename}` : req.body.photo;

  db.query(
    "UPDATE users SET nom=?, telephone=?, photo=? WHERE id=?",
    [nom, telephone, photo, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, message: "Profil mis à jour.", photo });
    }
  );
};

const changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  db.query("SELECT password FROM users WHERE id=?", [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    const ok = bcrypt.compareSync(oldPassword, results[0].password);
    if (!ok) return res.status(401).json({ success: false, message: "Ancien mot de passe incorrect." });
    const hashed = bcrypt.hashSync(newPassword, 10);
    db.query("UPDATE users SET password=? WHERE id=?", [hashed, req.user.id], (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, message: "Mot de passe changé." });
    });
  });
};

const getAllUsers = (req, res) => {
  db.query(
    "SELECT id, nom, email, role, telephone, created_at FROM users ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, data: results });
    }
  );
};

const deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Utilisateur supprimé." });
  });
};

module.exports = { getProfile, updateProfile, changePassword, getAllUsers, deleteUser };