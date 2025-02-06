import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundScreen = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '#f0f4f8',
                padding: 2,
            }}
        >
            <Box 
                component="img"
                src="/assets/404.jpg" // Imagen desde la carpeta `public`
                alt="404 Not Found"
                sx={{ width: 300, height: 'auto', marginBottom: 2 }}
            />
            <Typography variant="h5" sx={{ marginBottom: 2, color: '#555' }}>
                ¡Ups! Página no encontrada
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4, color: '#777' }}>
                La página que estás buscando no existe o ha sido movida.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    paddingX: 4,
                }}
                onClick={handleGoHome}
            >
                Volver al inicio
            </Button>
        </Box>
    );
};

export default NotFoundScreen;
