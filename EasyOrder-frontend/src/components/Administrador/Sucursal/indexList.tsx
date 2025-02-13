import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, TableContainerProps
} from '@mui/material';
import { styled } from '@mui/system';

interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  Restaurante: {
    nombre: string;
  };
}

interface SucursalListProps {
  sucursales: Sucursal[];
}

const StyledTableContainer = styled(TableContainer)<TableContainerProps>({
  backgroundColor: '#fff3e0',
  borderRadius: '10px',
  padding: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#d84315',
});

const StyledTableCell = styled(TableCell)({
  color: '#ffffff',
  fontWeight: 'bold',
});

const StyledButton = styled(Button)({
  backgroundColor: '#ff7043',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
});

const SucursalList: React.FC<SucursalListProps> = ({ sucursales }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#d84315' }}>
        📍 Lista de Sucursales
      </Typography>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Dirección</StyledTableCell>
            <StyledTableCell>Restaurante</StyledTableCell>
            <StyledTableCell>Acciones</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {sucursales.map((sucursal) => (
            <TableRow key={sucursal.id} sx={{ backgroundColor: '#ffe0b2' }}>
              <TableCell>{sucursal.nombre}</TableCell>
              <TableCell>{sucursal.direccion}</TableCell>
              <TableCell>{sucursal.Restaurante.nombre}</TableCell>
              <TableCell>
                <StyledButton variant="contained" color="secondary">
                  🗑 Eliminar
                </StyledButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SucursalList;
