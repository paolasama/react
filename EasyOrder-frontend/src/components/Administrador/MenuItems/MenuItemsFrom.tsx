import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import axios from "axios";

/** Interfaz para la categoría */
interface Categoria {
  id: number;
  nombre: string;
}

/** Tipo de datos para el formulario */
export interface MenuItemFormData {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number;
  activo: boolean;
  imagen?: File;
}

/** Props del componente */
interface MenuItemFormProps {
  onSubmit: (nuevoItem: FormData) => void;
}

export default function MenuItemForm({ onSubmit }: MenuItemFormProps) {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [activo, setActivo] = useState(true);
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Cargar categorías desde la API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categorias")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim() || !precio.trim() || categoriaId === null) {
      return;
    }

    // Usar FormData para enviar archivos
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("categoriaId", categoriaId.toString());
    formData.append("activo", activo.toString());
    if (imagen) {
      formData.append("imagen", imagen);
    }

    onSubmit(formData);

    // Limpiar formulario
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoriaId(null);
    setActivo(true);
    setImagen(null);
    setImagenPreview(null);
  };

  // Manejar previsualización de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 6,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        sx={{ mb: 3, fontFamily: "Poppins, sans-serif" }}
      >
        🍷 Agregar un Nuevo Ítem al Menú
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="🍛 Nombre del Platillo *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" },
          }}
        />

        <TextField
          label="📖 Descripción *"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          multiline
          rows={3}
          fullWidth
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" },
          }}
        />

        <TextField
          label="💲 Precio *"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          fullWidth
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" },
          }}
        />

        <FormControl fullWidth sx={{ bgcolor: "#fff", borderRadius: 2 }}>
          <InputLabel>🍽️ Categoría</InputLabel>
          <Select value={categoriaId ?? ""} onChange={(e) => setCategoriaId(Number(e.target.value))}>
            <MenuItem value="" disabled>
              Seleccione una categoría
            </MenuItem>
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={activo} onChange={() => setActivo(!activo)} />}
          label="🌟 Disponible en Menú"
          sx={{ mt: 1 }}
        />

        {/* Imagen con Previsualización */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 2 }}>
          {imagenPreview && (
            <Avatar src={imagenPreview} sx={{ width: 120, height: 120, borderRadius: 4, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }} />
          )}
          <Button
            variant="contained"
            component="label"
            sx={{
              bgcolor: "#FF7043",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#E64A19" },
            }}
          >
            📸 Seleccionar Imagen
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Box>

        <Button
          variant="contained"
          type="submit"
          sx={{
            fontWeight: "bold",
            bgcolor: "#43A047",
            color: "white",
            fontSize: "1.1rem",
            borderRadius: 4,
            py: 1.5,
            "&:hover": { bgcolor: "#2E7D32" },
          }}
        >
          ✅ Registrar Platillo
        </Button>
      </Box>
    </Paper>
  );
}
