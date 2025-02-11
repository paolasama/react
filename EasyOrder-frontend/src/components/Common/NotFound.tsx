import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundScreen = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: theme.palette.background.default,
                padding: { xs: 3, sm: 4 },
            }}
        >
            {/* Imagen con diseño gastronómico */}
            <Box
                component="img"
                src="/404.jpg" // Reemplázalo con una imagen representativa
                alt="Plato vacío - Página no encontrada"
                sx={{
                    width: { xs: 200, sm: 300, md: 350 },
                    height: 'auto',
                    marginBottom: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            />

            {/* Mensaje amigable y temático */}
            <Typography 
                variant="h4" 
                sx={{ 
                    fontWeight: 'bold', 
                    marginBottom: 2, 
                    color: theme.palette.text.primary 
                }}
            >
                ¡Oh no! 🍽️ Esta página está vacía
            </Typography>

            <Typography 
                variant="body1" 
                sx={{ 
                    marginBottom: 4, 
                    maxWidth: '80%', 
                    color: theme.palette.text.secondary 
                }}
            >
                Parece que la receta de esta página se perdió en la cocina.  
                ¿Por qué no vuelves al menú principal y eliges algo delicioso?
            </Typography>

            {/* Botón estilizado con efectos visuales */}
            <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    paddingX: 5,
                    paddingY: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: '0.3s',
                    backgroundColor: theme.palette.warning.main,
                    '&:hover': {
                        backgroundColor: theme.palette.warning.dark,
                        transform: 'scale(1.05)',
                    },
                }}
                onClick={() => navigate('/menu')}
            >
                Ver el Menú 🍕
            </Button>
        </Box>
    );
};

export default NotFoundScreen;
