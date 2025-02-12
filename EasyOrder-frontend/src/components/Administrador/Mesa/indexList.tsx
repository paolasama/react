import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const MesaList: React.FC = () => {
    const mesas = [
        { id: 1, nombre: 'Mesa 1', capacidad: 4, restaurante: 'Restaurante A' },
        { id: 2, nombre: 'Mesa 2', capacidad: 6, restaurante: 'Restaurante B' },
        { id: 3, nombre: 'Mesa 3', capacidad: 2, restaurante: 'Restaurante C' },
    ];

    return (
        <TableContainer component={Paper} sx={{ marginTop: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography
                variant="h5"
                sx={{ padding: 2, fontWeight: 'bold', backgroundColor: '#fff8e1', textAlign: 'center' }}
            >
                🍽️ Listado de Mesas 🍽️
            </Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#ffe0b2' }}>
                        <TableCell align="left"><strong>ID</strong></TableCell>
                        <TableCell align="left"><strong>Nombre</strong></TableCell>
                        <TableCell align="left"><strong>Capacidad</strong></TableCell>
                        <TableCell align="left"><strong>Restaurante</strong></TableCell>
                        <TableCell align="center"><strong>Acciones</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mesas.map((mesa) => (
                        <TableRow key={mesa.id} hover>
                            <TableCell align="left">{mesa.id}</TableCell>
                            <TableCell align="left">{mesa.nombre}</TableCell>
                            <TableCell align="left">{mesa.capacidad}</TableCell>
                            <TableCell align="left">{mesa.restaurante}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<Edit />}
                                    sx={{ marginRight: 1, fontWeight: 'bold', borderRadius: 2 }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    startIcon={<Delete />}
                                    sx={{ fontWeight: 'bold', borderRadius: 2 }}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MesaList;