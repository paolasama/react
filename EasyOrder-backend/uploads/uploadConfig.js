const multer = require("multer");
const path = require("path");

// Extensiones permitidas
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];
const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(new Error("Solo se permiten imágenes (.png, .jpg, .jpeg, .webp)."));
    }

    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

// Configuración de `multer`
const upload = multer({ storage });

module.exports = upload;
