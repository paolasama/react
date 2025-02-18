import React, { FunctionComponent, useState } from 'react';
import { Box, TextField, Button, Switch, FormControlLabel, Typography, styled } from '@mui/material';
import { NuevoRestauranteProps } from '../../../services/Administrador/servicioRestaurante';

// Propiedades del formulario
interface Props {
    alAgregarRestaurante: (restaurante: NuevoRestauranteProps) => void;
}

// Personalización del Switch con colores temáticos
const CustomSwitch = styled(Switch)({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#ff9800', // Naranja temático
        '& + .MuiSwitch-track': {
            backgroundColor: '#ff9800',
        },
    },
    '& .MuiSwitch-switchBase:not(.Mui-checked)': {
        color: '#d32f2f', // Rojo cuando está inactivo
        '& + .MuiSwitch-track': {
            backgroundColor: '#d32f2f',
        },
    },
});

const RestauranteForm: FunctionComponent<Props> = ({ alAgregarRestaurante }) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [activo, setActivo] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) {
            alert("El nombre del restaurante es obligatorio.");
            return;
        }
        const nuevoRestaurante: NuevoRestauranteProps = { nombre, direccion, activo };
        alAgregarRestaurante(nuevoRestaurante);
        setNombre('');
        setDireccion('');
        setActivo(true);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                maxWidth: '400px',
                margin: 'auto',
                padding: 4,
                boxShadow: 5,
                borderRadius: 3,
                backgroundColor: '#fff8e1', // Fondo temático beige
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6d4c41' }}>
                🍽️ Nuevo Restaurante
            </Typography>

            <TextField
                label="Nombre del restaurante"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
                fullWidth
            />
            <FormControlLabel
                control={<CustomSwitch checked={activo} onChange={(e) => setActivo(e.target.checked)} />}
                label="Activo"
            />
            <Button 
                type="submit" 
                variant="contained" 
                sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    paddingX: 4,
                    paddingY: 1.5,
                    backgroundColor: '#ff9800',
                    '&:hover': { backgroundColor: '#f57c00' }
                }}
            >
                Registrar Restaurante
            </Button>
        </Box>
    );
};

export default RestauranteForm;
