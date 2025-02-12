import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Select, InputLabel, FormControl, MenuItem } from '@mui/material';

// Definimos el tipo de las props para SucursalForm
interface SucursalFormProps {
  onAddSucursal: (nuevaSucursal: { nombre: string; direccion: string; restauranteId: number }) => void;
}

const SucursalForm: React.FC<SucursalFormProps> = ({ onAddSucursal }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [restauranteId, setRestauranteId] = useState<number | ''>(''); // Modificado a `number | ''`
  interface Restaurante {
    id: number;
    nombre: string;
  }

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/restaurantes')
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar restaurantes", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si los campos están completos
    if (!nombre || !direccion || restauranteId === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    setError('');
    const nuevaSucursal = { nombre, direccion, restauranteId: Number(restauranteId) };  // Conversión explícita a number
    onAddSucursal(nuevaSucursal);
    setNombre('');
    setDireccion('');
    setRestauranteId('');
  };

  return (
    <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Registrar Nueva Sucursal</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la Sucursal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Restaurante</InputLabel>
          <Select
            value={restauranteId}
            onChange={(e) => setRestauranteId(Number(e.target.value))}
            label="Restaurante"
            required
          >
            <MenuItem value="">Seleccione un restaurante</MenuItem>
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>Registrar Sucursal</Button>
      </form>
    </Paper>
  );
};

export default SucursalForm;