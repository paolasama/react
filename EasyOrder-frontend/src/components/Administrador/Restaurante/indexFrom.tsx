import { useState } from 'react';
import { Box, TextField, Button, Switch, FormControlLabel, Typography, styled } from '@mui/material';
import servicioRestaurante, { NuevoRestauranteProps } from '../../../services/Administrador/servicioRestaurante';

// Switch personalizado
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

const RestauranteForm = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [activo, setActivo] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nuevoRestaurante: NuevoRestauranteProps = { nombre, direccion, activo };
        console.log("📩 Enviando restaurante desde el formulario:", nuevoRestaurante);

        try {
            await servicioRestaurante.postRestaurante(nuevoRestaurante);
            alert('✅ Restaurante registrado con éxito');
            setNombre('');
            setDireccion('');
            setActivo(true);
        } catch {
            alert('❌ Error al registrar el restaurante');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                maxWidth: 400, margin: 'auto', padding: 4, boxShadow: 5, borderRadius: 3,
                backgroundColor: '#fff8e1',
            }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6d4c41' }}>
                🍽️ Nuevo Restaurante
            </Typography>
            <TextField label="Nombre del restaurante" value={nombre} onChange={(e) => setNombre(e.target.value)} required fullWidth />
            <TextField label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required fullWidth />
            <FormControlLabel control={<CustomSwitch checked={activo} onChange={(e) => setActivo(e.target.checked)} />} label="Activo" />
            <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', textTransform: 'none', backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#f57c00' } }}>
                Registrar Restaurante
            </Button>
        </Box>
    );
};

export default RestauranteForm;