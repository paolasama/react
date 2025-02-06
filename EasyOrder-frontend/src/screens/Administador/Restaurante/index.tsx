/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * RestaurantesScreen pantalla - creado por Raúl.Bañuelos - 26/11/2024
 * Actualización y mejoras - 01/02/2025
 * RestaurantesScreen.tsx
 */

import { FunctionComponent, useState, useEffect } from 'react';
import { Box, Typography, Divider, Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

// Componentes propios
// import RestauranteForm from '../../../components/Administrador/Restaurante/indexForm';
// import RestauranteList from '../../../components/Administrador/Restaurante/indexList';
import RestauranteForm from '../../../components/Administrador/Restaurante/indexFrom';
import RestauranteList from '../../../components/Administrador/Restaurante/indexList';

// Servicios propios
import servicioRestaurante, { RestauranteProps, ActualizaRestauranteProps } from '../../../services/Administrador/servicioRestaurante';

const RestaurantesScreen: FunctionComponent = () => {
    const [restaurantes, setRestaurantes] = useState<RestauranteProps[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [restauranteEditado, setRestauranteEditado] = useState<RestauranteProps | null>(null);

    useEffect(() => {
        ObtRestaurantes();
    }, []);

    const ObtRestaurantes = async () => {
        try {
            const restaurantesObtenidos = await servicioRestaurante.getRestaurantes();
            setRestaurantes(restaurantesObtenidos);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Error al obtener los restaurantes.');
        }
    };

    const ActEstadoRestaurante = async (idRestaurante: number, isActive: boolean) => {
        try {
            const updatedRestaurante = await servicioRestaurante.putRestauranteIDEstado(idRestaurante, isActive);
            setRestaurantes((prev) => prev.map((rest) => (rest.id === idRestaurante ? { ...rest, activo: updatedRestaurante.activo } : rest)));
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Error al actualizar el estado.');
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Restaurantes
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <RestauranteForm alAgregarRestaurante={() => ObtRestaurantes()} />
            <Divider sx={{ marginY: 3 }} />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <RestauranteList restaurantes={restaurantes} alActualizarEstRestaurante={ActEstadoRestaurante} alEditarRestaurante={() => {}} />
        </Box>
    );
};

export default RestaurantesScreen;
