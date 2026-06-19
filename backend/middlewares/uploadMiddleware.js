const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `uploads/${folder}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", "image/jpg", "image/png", "image/webp",
    "video/mp4", "video/webm", "video/quicktime"
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formats autorisés : jpg, jpeg, png, webp, mp4, webm, mov"));
  }
};

const limits = { fileSize: 50 * 1024 * 1024 };

module.exports = {
  uploadProduct: multer({ storage: createStorage("products"), fileFilter, limits }),
  uploadProfile: multer({ storage: createStorage("profiles"), fileFilter, limits }),
};