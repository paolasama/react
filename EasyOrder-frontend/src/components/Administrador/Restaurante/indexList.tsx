/**
 * RestauranteList componente - creado por Raúl.Bañuelos - 26/11/2024
 * Actualización y mejoras - 01/02/2025
 * RestauranteList.tsx
 */

import { FunctionComponent } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Switch } from '@mui/material';

// Servicios propios
import { RestauranteProps } from '../../../services/Administrador/servicioRestaurante';

// Interface de Props del componente RestauranteList
interface Props {
    restaurantes: RestauranteProps[];
    alActualizarEstRestaurante: (id: number, isActive: boolean) => void;
    alEditarRestaurante: (restaurante: RestauranteProps) => void;
}

const RestauranteList: FunctionComponent<Props> = ({ restaurantes, alActualizarEstRestaurante, alEditarRestaurante }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Activo</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurant) => (
                        <TableRow key={restaurant.id} style={{ opacity: restaurant.activo ? 1 : 0.5, backgroundColor: restaurant.activo ? 'inherit' : '#f8d7da' }}>
                            <TableCell>{restaurant.nombre}</TableCell>
                            <TableCell>{restaurant.direccion || 'Sin dirección'}</TableCell>
                            <TableCell>
                                <Switch color="primary" checked={restaurant.activo} onChange={() => alActualizarEstRestaurante(restaurant.id, !restaurant.activo)} />
                            </TableCell>
                            <TableCell>
                                <Button color="primary" onClick={() => alEditarRestaurante(restaurant)} disabled={!restaurant.activo}>
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

export default RestauranteList;
