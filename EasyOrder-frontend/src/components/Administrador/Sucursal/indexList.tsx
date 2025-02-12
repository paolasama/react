import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  Restaurante: {
    nombre: string; // Nombre del restaurante
  };
}

interface SucursalListProps {
  sucursales: Sucursal[];
}

const SucursalList: React.FC<SucursalListProps> = ({ sucursales }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>Lista de Sucursales</Typography>
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
          {sucursales.map((sucursal) => (
            <TableRow key={sucursal.id}>
              <TableCell>{sucursal.nombre}</TableCell>
              <TableCell>{sucursal.direccion}</TableCell>
              <TableCell>{sucursal.Restaurante.nombre}</TableCell> {/* Mostrar el nombre del restaurante */}
              <TableCell>
                <Button variant="contained" color="secondary">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SucursalList;