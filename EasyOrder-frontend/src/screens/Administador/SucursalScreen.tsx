import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SucursalForm from '../../components/Administrador/Sucursal/indexFrom';
import SucursalList from '../../components/Administrador/Sucursal/indexList';
import { Container, Typography, Paper, Alert, Box } from '@mui/material';
import { styled } from '@mui/system';

// Definimos el tipo Sucursal correctamente
interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  restauranteId: number;
  Restaurante: {
    nombre: string;
  };
}

// Estilos personalizados para la pantalla
const StyledContainer = styled(Container)({
  marginTop: '30px',
  padding: '20px',
  backgroundColor: '#fff3e0',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const StyledTitle = styled(Typography)({
  textAlign: 'center',
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#d84315',
  marginBottom: '20px',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  backgroundColor: '#ffcc80',
  borderRadius: '10px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
});

const SucursalScreen: React.FC = () => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [error, setError] = useState('');

  // Función para obtener la lista de sucursales desde el backend
  const obtenerSucursales = () => {
    axios.get('http://localhost:3000/api/sucursales')
      .then(response => {
        setSucursales(response.data);
      })
      .catch(error => {
        console.error('Error al obtener sucursales:', error);
        setError('❌ Error al obtener sucursales');
      });
  };

  useEffect(() => {
    obtenerSucursales();
  }, []);

  // Callback para agregar una nueva sucursal
  const onAddSucursal = (nuevaSucursal: { nombre: string; direccion: string; restauranteId: number }) => {
    const payload = {
      nombre: nuevaSucursal.nombre,
      direccion: nuevaSucursal.direccion,
      restaurante_id: nuevaSucursal.restauranteId,
    };

    axios.post('http://localhost:3000/api/sucursales', payload)
      .then(() => {
        obtenerSucursales();
      })
      .catch(error => {
        console.error('Error al agregar sucursal:', error);
        setError('❌ Error al agregar sucursal');
      });
  };

  return (
    <StyledContainer>
      <StyledTitle>🍽️ Gestión de Sucursales</StyledTitle>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <StyledPaper elevation={3}>
        <SucursalForm onAddSucursal={onAddSucursal} />
      </StyledPaper>

      <Box mt={3}>
        <SucursalList sucursales={sucursales} />
      </Box>
    </StyledContainer>
  );
};

export default SucursalScreen;
