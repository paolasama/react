/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Alert, Snackbar, CircularProgress } from '@mui/material';
//import RestauranteForm from '../../../components/Administrador/Restaurante/RestauranteForm';
import RestauranteForm from '../../../components/Administrador/Restaurante/indexFrom';
import servicioRestaurante, { RestauranteProps } from '../../../services/Administrador/servicioRestaurante';

const RestaurantesScreen = () => {
    const [restaurantes, setRestaurantes] = useState<RestauranteProps[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const alAgregarRestaurante = (nuevoRestaurante: RestauranteProps) => {
        setRestaurantes((prev) => [...prev, nuevoRestaurante]);
        setSuccessMessage('Restaurante agregado exitosamente');
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const obtenerRestaurantes = async () => {
        try {
            const data = await servicioRestaurante.getRestaurantes();
            setRestaurantes(data);
        } catch (err: any) {
            setErrorMessage('Error al obtener la lista de restaurantes.');
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        obtenerRestaurantes();
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Restaurantes
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <RestauranteForm alAgregarRestaurante={alAgregarRestaurante} />
                    {/* Renderiza la lista de restaurantes si es necesario */}
                </>
            )}

            {/* Snackbar para mensajes */}
            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!errorMessage}
                autoHideDuration={3000}
                onClose={() => setErrorMessage(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RestaurantesScreen;
