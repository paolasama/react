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

const MesaList: React.FC = () => {
    const mesas = [
        { id: 1, nombre: 'Mesa 1', capacidad: 4, restaurante: 'Restaurante A' },
        { id: 2, nombre: 'Mesa 2', capacidad: 6, restaurante: 'Restaurante B' },
        { id: 3, nombre: 'Mesa 3', capacidad: 2, restaurante: 'Restaurante C' },
    ];

    return (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Typography variant="h6" sx={{ padding: 2 }}>
                Listado de Mesas
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="left">Capacidad</TableCell>
                        <TableCell align="left">Restaurante</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mesas.map((mesa) => (
                        <TableRow key={mesa.id}>
                            <TableCell align="left">{mesa.id}</TableCell>
                            <TableCell align="left">{mesa.nombre}</TableCell>
                            <TableCell align="left">{mesa.capacidad}</TableCell>
                            <TableCell align="left">{mesa.restaurante}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ marginRight: 1 }}
                                >
                                    Editar
                                </Button>
                                <Button variant="outlined" color="error" size="small">
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
