import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Paper } from '@mui/material';
import axios from 'axios';

type Restaurante = {
    id: number;
    nombre: string;
};

type Sucursal = {
    id: number;
    nombre: string;
};

type EstadoMesa = 'activo' | 'inactivo';

interface MesaFormProps {
    onSuccess: () => void;
}

const MesaForm: React.FC<MesaFormProps> = ({ onSuccess }) => {
    const [numeroMesa, setNumeroMesa] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [estado, setEstado] = useState<EstadoMesa>('activo');
    const [restauranteId, setRestauranteId] = useState<number | ''>('');
    const [sucursalId, setSucursalId] = useState<number | ''>('');
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get<Restaurante[]>('http://localhost:3000/api/restaurantes')
            .then((response) => setRestaurantes(response.data))
            .catch(() => setError("Error al cargar restaurantes"));

        axios.get<Sucursal[]>('http://localhost:3000/api/sucursales')
            .then((response) => setSucursales(response.data))
            .catch(() => setError("Error al cargar sucursales"));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!numeroMesa || !capacidad || !estado || !restauranteId || !sucursalId) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setError('');
        const mesaData = { numeroMesa, capacidad, estado, restauranteId, sucursalId };
        try {
            await axios.post('http://localhost:3000/api/mesas', mesaData);
            onSuccess();
        } catch (err) {
            console.error("❌ Error al registrar la mesa:", err);
            setError("Error al registrar la mesa");
        }
    };

    return (
        <Paper sx={{
            maxWidth: 500,
            margin: 'auto',
            padding: 3,
            borderRadius: 5,
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
                ✨ Registrar Nueva Mesa
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Número de Mesa" fullWidth variant="outlined" value={numeroMesa} onChange={(e) => setNumeroMesa(e.target.value)} sx={{ mb: 2 }} type="number" />
                <TextField label="Capacidad" fullWidth variant="outlined" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} sx={{ mb: 2 }} type="number" />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select value={estado} onChange={(e) => setEstado(e.target.value as EstadoMesa)}>
                        <MenuItem value="activo">Activo</MenuItem>
                        <MenuItem value="inactivo">Inactivo</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Restaurante</InputLabel>
                    <Select value={restauranteId} onChange={(e) => setRestauranteId(Number(e.target.value))}>
                        <MenuItem value="">Selecciona un restaurante</MenuItem>
                        {restaurantes.map((restaurante) => (
                            <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Sucursal</InputLabel>
                    <Select value={sucursalId} onChange={(e) => setSucursalId(Number(e.target.value))}>
                        <MenuItem value="">Selecciona una sucursal</MenuItem>
                        {sucursales.map((sucursal) => (
                            <MenuItem key={sucursal.id} value={sucursal.id}>
                                {sucursal.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Registrar Mesa
                </Button>
            </form>
        </Paper>
    );
};

export default MesaForm;
