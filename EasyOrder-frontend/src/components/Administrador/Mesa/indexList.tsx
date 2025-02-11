import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import servicioMesa from '../../../services/Administrador/servicioMesa'; // Importa el servicio

interface Mesa {
    id: number;
    numeroMesa: string;
    capacidad: string;
    estado: string;
    restaurante: string;
    sucursal: string;
}

const MesaList: React.FC = () => {
    const [mesas, setMesas] = useState<Mesa[]>([]);

    useEffect(() => {
        servicioMesa.getMesas()
            .then((response) => setMesas(response))
            .catch((error) => console.error("❌ Error al cargar las mesas:", error));
    }, []);

    return (
        <TableContainer component={Paper} sx={{
            maxWidth: 700,
            margin: '20px auto',  // Asegúrate de que el margen sea apropiado
            padding: 3,  // Ajusta el padding del contenedor
            borderRadius: 5,
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
        }}>
            <Typography variant="h5" sx={{
                mb: 3,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#1976d2',
            }}>
                Lista de Mesas
            </Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{
                        backgroundColor: '#1976d2',
                        borderRadius: 5,
                    }}>
                        {['Número de Mesa', 'Capacidad', 'Estado', 'Restaurante', 'Sucursal', 'Acciones'].map((text) => (
                            <TableCell key={text} sx={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                padding: '8px',
                            }}>
                                {text}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mesas.map((mesa) => (
                        <TableRow key={mesa.id} sx={{
                            '&:hover': { backgroundColor: '#f5f5f5' },
                        }}>
                            <TableCell>{mesa.numeroMesa}</TableCell>
                            <TableCell>{mesa.capacidad}</TableCell>
                            <TableCell>{mesa.estado}</TableCell>
                            <TableCell>{mesa.restaurante}</TableCell>
                            <TableCell>{mesa.sucursal}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        borderRadius: 3,
                                        marginTop: 1,  // Añade un pequeño margen si es necesario
                                        '&:hover': {
                                            backgroundColor: '#1565c0',
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                >
                                    Editar
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
