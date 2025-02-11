import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { SucursalProps } from '../../../services/Administrador/servicioSucursal'; // Asegúrate de que la ruta sea correcta
import servicioSucursal from '../../../services/Administrador/servicioSucursal'; // Importar el servicio

const SucursalList = () => {
    const [sucursales, setSucursales] = useState<SucursalProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Obtener las sucursales al cargar el componente
    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await servicioSucursal.getSucursales();
                setSucursales(response);
            } catch (error) {
                setError("Error al obtener las sucursales");
                console.error(error);
            }
        };

        fetchSucursales();
    }, []);

    // Eliminar una sucursal
    const handleDelete = async (id: number) => {
        try {
            await servicioSucursal.deleteSucursal(id);
            setSucursales(sucursales.filter((sucursal) => sucursal.id !== id));
            alert('Sucursal eliminada correctamente.');
        } catch (error) {
            console.error("❌ Error al eliminar la sucursal", error);
            alert('Error al eliminar la sucursal');
        }
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '20px auto', padding: 3, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
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
                                    <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(sucursal.id)}>
                                        Eliminar
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
