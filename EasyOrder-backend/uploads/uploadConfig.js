// config/uploadConfig.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guarda los archivos en la carpeta "uploads" (ubicada en la raíz del backend)
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Genera un nombre único
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Extensión del archivo original (por ejemplo, .jpg, .png, .webp)
    const ext = path.extname(file.originalname) || "";

    // Nombre base (sin extensión)
    const baseName = path.basename(file.originalname, ext);

    // Nombre final -> baseName-<timestamp>-<random>.ext
    cb(null, baseName + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;
