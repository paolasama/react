/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * RestauranteForm componente - creado por Raúl.Bañuelos - 26/11/2024
 * Actualización y mejoras - 01/02/2025
 * RestauranteForm.tsx
 */

import React, { FunctionComponent, useState } from 'react';
import { TextField, Button, Box, CircularProgress, Alert, } from '@mui/material';//Switch, FormControlLabel 

// Servicios propios
import servicioRestaurante, { RestauranteProps, NuevoRestauranteProps } from '../../../services/Administrador/servicioRestaurante';

// Interface de Props del componente RestauranteForm
interface Props {
    alAgregarRestaurante: (restaurant: RestauranteProps) => void;
}

const RestauranteForm: FunctionComponent<Props> = ({ alAgregarRestaurante }) => {
    // Hooks -> Uso de estados
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    //const [activo, setActivo] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    /**
     ** Método para manejar el envío del formulario
     * @author José Raúl Bañuelos Gámez
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const restaurantData: NuevoRestauranteProps = { nombre, direccion };

        try {
            const restauranteData = await servicioRestaurante.postRestaurante(restaurantData);
            alAgregarRestaurante(restauranteData);
            limpiarFormulario();
        } catch (err: any) {
            setErrorMessage(err.response?.data?.message || 'Error al registrar el restaurante.');
        } finally {
            setLoading(false);
        }
    };

    /**
     ** Método para limpiar el formulario
     * @author José Raúl Bañuelos Gámez
     */
    const limpiarFormulario = () => {
        setNombre('');
        setDireccion('');
        //setActivo(true);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                maxWidth: '400px',
                width: '100%',
                gap: 2,
            }}
        >
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <TextField label="Nombre del restaurante" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={loading} required />
            <TextField label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} disabled={loading} required />
            {/* <FormControlLabel control={<Switch checked={activo} onChange={(e) => setActivo(e.target.checked)} disabled={loading} />} label="Activo" /> */}
            <Button color="primary" type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Registrar restaurante'}
            </Button>
        </Box>
    );
};

export default RestauranteForm;
