import React, { useState, useEffect } from "react";
import { Paper, Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button, Typography } from "@mui/material";
import axios from "axios";

interface Categoria {
  id: number;
  nombre: string;
}

interface MenuItem {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number;
  activo: boolean;
  imagen?: File;
}

interface MenuItemFormProps {
  onSubmit: (nuevoItem: FormData) => void;
}

export default function MenuItemForm({ onSubmit }: MenuItemFormProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [activo, setActivo] = useState(true);
  const [imagen, setImagen] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/categorias").then(res => setCategorias(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim() || !precio.trim() || categoriaId === "") return;

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("categoriaId", String(categoriaId));
    formData.append("activo", String(activo));
    if (imagen) formData.append("imagen", imagen);

    onSubmit(formData);

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoriaId("");
    setActivo(true);
    setImagen(null);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary">
        Gestión de Menú Items
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <TextField label="Descripción *" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required multiline rows={2} />
        <TextField label="Precio *" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        
        <FormControl fullWidth>
          <InputLabel>Seleccione una categoría</InputLabel>
          <Select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value === "" ? "" : Number(e.target.value))}>
            <MenuItem value="">Seleccione una categoría</MenuItem>
            {categorias.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.nombre}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControlLabel control={<Switch checked={activo} onChange={() => setActivo(!activo)} />} label="Activo" />

        <Typography variant="body2">Seleccionar imagen</Typography>
        <input type="file" onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)} />

        <Button variant="contained" type="submit">Registrar Menú Item</Button>
      </Box>
    </Paper>
  );
}
