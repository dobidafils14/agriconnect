const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =========================
// INSCRIPTION
// =========================
const register = (req, res) => {
  const { nom, email, password, role, telephone } = req.body;

  if (!nom || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Nom, email, mot de passe et rôle obligatoires."
    });
  }

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cet email existe déjà."
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create(
      {
        nom,
        email,
        password: hashedPassword,
        role,
        telephone
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

        res.status(201).json({
          success: true,
          message: "Compte créé avec succès.",
          userId: result.insertId
        });
      }
    );
  });
};

// =========================
// CONNEXION
// =========================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email et mot de passe obligatoires."
    });
  }

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);

      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect."
      });
    }

    const user = results[0];

    const isMatch = bcrypt.compareSync(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        nom: user.nom
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        telephone: user.telephone,
        photo: user.photo
      }
    });
  });
};

// =========================
// RESET PASSWORD
// =========================
const resetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email et nouveau mot de passe obligatoires."
    });
  }

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur introuvable."
      });
    }

    const hashedPassword = bcrypt.hashSync(
      newPassword,
      10
    );

    User.updatePassword(
      email,
      hashedPassword,
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

        res.json({
          success: true,
          message: "Mot de passe réinitialisé avec succès."
        });
      }
    );
  });
};

module.exports = {
  register,
  login,
  resetPassword
};