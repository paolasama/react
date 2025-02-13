import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField, Button, Typography, Paper, Select, InputLabel,
  FormControl, MenuItem, Alert
} from '@mui/material';
import { styled } from '@mui/system';

// Definimos el tipo de las props para SucursalForm
interface SucursalFormProps {
  onAddSucursal: (nuevaSucursal: { nombre: string; direccion: string; restauranteId: number }) => void;
}

// Estilos personalizados para el formulario
const StyledPaper = styled(Paper)({
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: '#fff3e0', // Fondo cálido
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)({
  backgroundColor: '#ff7043', 
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
});

const SucursalForm: React.FC<SucursalFormProps> = ({ onAddSucursal }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [restauranteId, setRestauranteId] = useState<number | ''>('');
  const [restaurantes, setRestaurantes] = useState<{ id: number; nombre: string }[]>([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/restaurantes')
      .then((response) => setRestaurantes(response.data))
      .catch(() => setError('❌ Error al cargar los restaurantes'));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !direccion || restauranteId === '') {
      setError('⚠️ Todos los campos son obligatorios');
      return;
    }

    setError('');
    onAddSucursal({ nombre, direccion, restauranteId: Number(restauranteId) });
    setMensaje('✅ Sucursal registrada exitosamente');

    setNombre('');
    setDireccion('');
    setRestauranteId('');
  };

  return (
    <StyledPaper elevation={4}>
      <Typography variant="h5" sx={{ mb: 2, color: '#d84315', fontWeight: 'bold' }}>
        🏪 Registrar Nueva Sucursal
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {mensaje && <Alert severity="success" sx={{ mb: 2 }}>{mensaje}</Alert>}

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
          <InputLabel id="select-restaurante-label">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante-label"
            value={restauranteId}
            onChange={(e) => setRestauranteId(e.target.value === '' ? '' : Number(e.target.value))}
          >
            <MenuItem value="">Seleccione un restaurante</MenuItem>
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <StyledButton type="submit" variant="contained" fullWidth>
           Registrar Sucursal
        </StyledButton>
      </form>
    </StyledPaper>
  );
};

export default SucursalForm;
