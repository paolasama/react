import { FunctionComponent, useState, useEffect } from 'react';
import { Box, Typography, Divider, Alert } from '@mui/material';
import RestauranteForm from '../../components/Administrador/Restaurante/indexFrom';
import RestauranteList from '../../components/Administrador/Restaurante/indexList';
import servicioRestaurante, { RestauranteProps, NuevoRestauranteProps } from '../../services/Administrador/servicioRestaurante';

const RestaurantesScreen: FunctionComponent = () => {
    const [restaurantes, setRestaurantes] = useState<RestauranteProps[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Método para agregar un restaurante
    const AddRestaurante = async (nuevoRestaurante: NuevoRestauranteProps) => {
        try {
            const restauranteCreado = await servicioRestaurante.postRestaurante(nuevoRestaurante);
            setRestaurantes((prev) => [...prev, restauranteCreado]);
            setSuccessMessage(`El restaurante "${restauranteCreado.nombre}" se ha registrado exitosamente.`);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error('Error al agregar el restaurante:', err); // Se usa 'err' para depuración
            setErrorMessage('Error al agregar el restaurante. Por favor, inténtelo nuevamente.');
        }
    };

    // Método para obtener todos los restaurantes
    const ObtRestaurantes = async () => {
        try {
            const data = await servicioRestaurante.getRestaurantes();
            setRestaurantes(data);
        } catch (err) {
            console.error('Error al obtener los restaurantes:', err); // Se usa 'err' para depuración
            setErrorMessage('Error al obtener los restaurantes.');
        }
    };

    useEffect(() => {
        ObtRestaurantes();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 4,
                gap: 4,
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h4">Gestión de Restaurantes</Typography>
            <Divider sx={{ width: '100%' }} />
            <RestauranteForm alAgregarRestaurante={AddRestaurante} />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Divider sx={{ width: '100%' }} />
            <RestauranteList
                restaurantes={restaurantes}
                alActualizarEstRestaurante={(id, isActive) => {
                    setRestaurantes((prev) =>
                        prev.map((rest) =>
                            rest.id === id ? { ...rest, activo: isActive } : rest
                        )
                    );
                }}
            />
        </Box>
    );
};

export default RestaurantesScreen;
