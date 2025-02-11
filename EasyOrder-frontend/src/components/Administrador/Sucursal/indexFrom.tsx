import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import servicioSucursal from '../../../services/Administrador/servicioSucursal'; // Asegúrate de que la ruta sea correcta

type Restaurante = {
    id: number;
    nombre: string;
};

const SucursalForm = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [restauranteId, setRestauranteId] = useState<number | ''>('');
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Obtener la lista de restaurantes para mostrar en el select
        axios.get('http://localhost:3000/api/restaurantes')
            .then(response => setRestaurantes(response.data))
            .catch(error => console.error("❌ Error al cargar restaurantes:", error));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("📌 Formulario enviado");

        if (!nombre || !direccion || !restauranteId) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setError('');
        setSuccess(false);

        try {
            const sucursalData = { nombre, direccion, restauranteId: Number(restauranteId) };
            const response = await servicioSucursal.postSucursal(sucursalData);
            setSuccess(true);
            setNombre('');
            setDireccion('');
            setRestauranteId('');
            console.log("✅ Sucursal creada:", response);
        } catch (error) {
            console.error("❌ Error al crear la sucursal:", error);
            setError("Error al crear la sucursal");
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Registrar Nueva Sucursal</Typography>
            <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#fff', width: 400, textAlign: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre de la Sucursal"
                        fullWidth
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Dirección"
                        fullWidth
                        variant="outlined"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Restaurante</InputLabel>
                        <Select
                            value={restauranteId}
                            onChange={(e) => setRestauranteId(Number(e.target.value))}
                        >
                            <MenuItem value="">Selecciona un restaurante</MenuItem>
                            {restaurantes.map((restaurante) => (
                                <MenuItem key={restaurante.id} value={restaurante.id}>
                                    {restaurante.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    {success && <Typography color="primary" sx={{ mt: 2 }}>✅ Sucursal registrada con éxito.</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Registrar Sucursal
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default SucursalForm;
