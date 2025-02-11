import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import MesaForm from '../../components/Administrador/Mesa/indexFrom';
import MesaList from '../../components/Administrador/Mesa/indexList';

function MesaScreen() {
  const handleSuccess = () => {
    console.log('Operación exitosa');
  };

  return (
    <Container maxWidth="md" sx={{
      marginTop: 4,
      padding: 3,
      backgroundColor: '#f7f8fa',
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}>
      <Paper elevation={4} sx={{
        padding: 4,
        borderRadius: 3,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
          🍽️ Gestión de Mesas 🍽️
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', marginBottom: 3 }}>
          Registra nuevas mesas y consulta la lista de mesas disponibles.
        </Typography>
        <Box sx={{ marginBottom: 3 }}>
          <MesaForm onSuccess={handleSuccess} />
        </Box>
        <MesaList />
      </Paper>
    </Container>
  );
}

export default MesaScreen;
