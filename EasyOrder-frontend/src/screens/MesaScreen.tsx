import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import MesaForm from '../../components/Administrador/Mesa/indexFrom';
import MesaList from '../../components/Administrador/Mesa/indexList';

function MesaScreen() {
    const handleSuccess = () => {
        console.log('Operación exitosa');
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Paper elevation={4} sx={{ padding: 3, borderRadius: 3, backgroundColor: '#fff8e1' }}>
                <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
                    🍽️ Gestión de Mesas 🍽️
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