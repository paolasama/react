   // EasyOrder-backend/routes/categoriaRoutes.js
   const { Router } = require("express");
   const {
     getCategorias,
     createCategoria,
     updateCategoria,
     deleteCategoria,
   } = require("../controllers/categoriaController");  // Asegúrate que el path y nombres sean correctos

   const router = Router();

   router.get("/", getCategorias);
   router.post("/", createCategoria);  // <-- Aquí el callback debe ser una función definida
   router.put("/:id", updateCategoria);
   router.delete("/:id", deleteCategoria);

   module.exports = router;