import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

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
            const response = await axios.post('http://localhost:3000/api/sucursales', {
                nombre,
                direccion,
                restauranteId: Number(restauranteId),
            });

            console.log("✅ Sucursal creada:", response.data);
            setSuccess(true);
            setNombre('');
            setDireccion('');
            setRestauranteId('');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("❌ Error al crear la sucursal:", error.response?.data || error.message);
                setError(error.response?.data?.message || "Error desconocido");
            } else {
                console.error("❌ Error inesperado:", error);
                setError("Error inesperado al registrar la sucursal");
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f4f6f8',
                minHeight: '50vh',
                paddingTop: 4,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                <StoreIcon sx={{ fontSize: 40, color: "#1565c0" }} />
                Gestión de Sucursales
            </Typography>

            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    width: 400,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                    Nueva Sucursal
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre de la Sucursal"
                        fullWidth
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        sx={{ mt: 2, backgroundColor: '#fff' }}
                    />
                    <TextField
                        label="Dirección"
                        fullWidth
                        variant="outlined"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        sx={{ mt: 2, backgroundColor: '#fff' }}
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
                        sx={{
                            mt: 3,
                            textTransform: 'none',
                            fontSize: 16,
                            borderRadius: 2,
                        }}
                    >
                        Registrar Sucursal
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default SucursalForm;
