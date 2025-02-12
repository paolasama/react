import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import axios from 'axios';
import BusinessIcon from '@mui/icons-material/Business';

interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: { nombre: string };
}

const SucursalList = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                console.log("📌 Cargando sucursales...");
                const response = await axios.get('http://localhost:3000/api/sucursales');
                console.log("✅ Sucursales obtenidas:", response.data);
                setSucursales(response.data);
            } catch (error) {
                console.error("❌ Error al obtener sucursales:", error);
                setError("Error al cargar las sucursales.");
            }
        };

        fetchSucursales();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '20px auto', padding: 3, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <BusinessIcon sx={{ fontSize: 30, color: "#1565c0" }} />
                📍 Lista de Sucursales
            </Typography>

            {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}

            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Dirección</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Restaurante</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sucursales.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">No hay sucursales registradas.</TableCell>
                        </TableRow>
                    ) : (
                        sucursales.map((sucursal) => (
                            <TableRow key={sucursal.id}>
                                <TableCell>{sucursal.nombre}</TableCell>
                                <TableCell>{sucursal.direccion}</TableCell>
                                <TableCell>{sucursal.restaurante.nombre}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" size="small">
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SucursalList;