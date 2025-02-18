// src/components/Administrador/MenuItems/MenuItemForm.tsx
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
  Typography
} from "@mui/material";
import axios from "axios";

/** Interfaz para la categoría (usada en el select) */
interface Categoria {
  id: number;
  nombre: string;
}

/** Tipo de datos que el formulario enviará al registrar */
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
  onSubmit: (nuevoItem: MenuItemFormData) => void;
}

export default function MenuItemForm({ onSubmit }: MenuItemFormProps) {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  // Manejar categoría como number | null
  const [categoriaId, setCategoriaId] = useState<number | null>(null);

  const [activo, setActivo] = useState(true);
  const [imagen, setImagen] = useState<File | null>(null);

  // Lista de categorías para el select
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Cargar categorías al montar el componente
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categorias")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  // Manejar submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos mínimos
    if (!nombre.trim() || !descripcion.trim() || !precio.trim() || categoriaId === null) {
      return;
    }

    // Construir el objeto que se enviará al padre
    const data: MenuItemFormData = {
      nombre,
      descripcion,
      precio: Number(precio),
      categoriaId,
      activo,
      imagen: imagen || undefined
    };

    onSubmit(data);

    // Limpiar formulario
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoriaId(null);
    setActivo(true);
    setImagen(null);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary" gutterBottom>
        Gestión de Menú Items
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <TextField
          label="Descripción *"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          multiline
          rows={2}
        />

        <TextField
          label="Precio *"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <FormControl fullWidth>
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            label="Categoría"
            value={categoriaId === null ? "" : categoriaId}
            onChange={(e) => {
              const val = e.target.value;
              setCategoriaId(val === "" ? null : Number(val));
            }}
          >
            {/* Menú disabled como placeholder */}
            <MenuItem value="" disabled style={{ color: "#999" }}>
              Seleccione una categoría
            </MenuItem>

            {/* Opciones reales */}
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={activo} onChange={() => setActivo(!activo)} />}
          label="Activo"
        />

        <Typography variant="body2">Seleccionar imagen</Typography>
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
        />

        <Button variant="contained" type="submit">
          Registrar Menú Item
        </Button>
      </Box>
    </Paper>
  );
}
