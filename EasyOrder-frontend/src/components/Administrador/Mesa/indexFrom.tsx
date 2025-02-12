import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, MenuItem, Switch, FormControlLabel, styled } from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

interface MesaFormProps {
    onSuccess: () => void;
}

// Estilos personalizados para el Switch
const CustomSwitch = styled(Switch)({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#ff9800',
        '& + .MuiSwitch-track': {
            backgroundColor: '#ff9800',
        },
    },
    '& .MuiSwitch-switchBase:not(.Mui-checked)': {
        color: '#d32f2f',
        '& + .MuiSwitch-track': {
            backgroundColor: '#d32f2f',
        },
    },
});

const MesaForm: React.FC<MesaFormProps> = ({ onSuccess }) => {
    const [activo, setActivo] = useState(true);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Formulario procesado');
        onSuccess();
    };

    return (
        <Paper
            elevation={8}
            sx={{
                maxWidth: 500,
                margin: 'auto',
                padding: 4,
                borderRadius: 3,
                backgroundColor: '#fff8e1',
                boxShadow: 5,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/* Título del formulario */}
                <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center">
                    <TableRestaurantIcon fontSize="large" sx={{ marginRight: 1, color: '#6d4c41' }} />
                    Gestión de Mesas
                </Typography>

                {/* Campos del formulario */}
                <TextField label="Número de Mesa" type="number" fullWidth required />
                <TextField label="Capacidad" type="number" fullWidth required />
                <TextField select label="Estado" fullWidth required>
                    <MenuItem value="Libre">🟢 Libre</MenuItem>
                    <MenuItem value="Ocupado">🔴 Ocupado</MenuItem>
                </TextField>
                <TextField select label="Seleccione un restaurante" fullWidth required>
                    <MenuItem value="Restaurante A">🍽️ Restaurante A</MenuItem>
                    <MenuItem value="Restaurante B">🍕 Restaurante B</MenuItem>
                </TextField>
                <TextField select label="Seleccione una sucursal" fullWidth required>
                    <MenuItem value="Sucursal 1">📍 Sucursal 1</MenuItem>
                    <MenuItem value="Sucursal 2">📍 Sucursal 2</MenuItem>
                </TextField>

                {/* Switch Activo/Inactivo con estilo mejorado */}
                <FormControlLabel
                    control={<CustomSwitch checked={activo} onChange={(e) => setActivo(e.target.checked)} />}
                    label="Activo"
                    sx={{ color: activo ? '#ff9800' : '#d32f2f', fontWeight: 'bold' }}
                />

                {/* Botón de registro */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#ff9800',
                        '&:hover': { backgroundColor: '#f57c00' },
                    }}
                >
                    REGISTRAR MESA
                </Button>
            </Box>
        </Paper>
    );
};

export default MesaForm;