// config/uploadConfig.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guarda los archivos en la carpeta "uploads" (ubicada en la raíz del backend)
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Genera un nombre único para cada archivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;