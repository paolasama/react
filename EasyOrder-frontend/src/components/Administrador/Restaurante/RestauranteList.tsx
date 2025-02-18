import { Table, TableBody, TableCell, TableHead, TableRow, Switch, Button, Box, styled, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { RestauranteProps } from '../../../services/Administrador/servicioRestaurante';

// Switch personalizado
const CustomSwitch = styled(Switch)({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#ff9800',
        '& + .MuiSwitch-track': {
            backgroundColor: '#ff9800',
        },
    },
    '& .MuiSwitch-switchBase:not(.Mui-checked)': {
        color: '#d32f2f',
        '& + .MuiSwitch-track': {
            backgroundColor: '#d32f2f',
        },
    },
});

const RestauranteList = ({ restaurantes, alActualizarEstRestaurante }: { restaurantes: RestauranteProps[], alActualizarEstRestaurante: (id: number, isActive: boolean) => void }) => {
    return (
        <Box sx={{ overflowX: 'auto', padding: 3, backgroundColor: '#fff8e1', borderRadius: 3, boxShadow: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#6d4c41' }}>
                📜 Lista de Restaurantes
            </Typography>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#ffe0b2' }}>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell><strong>Dirección</strong></TableCell>
                        <TableCell><strong>Activo</strong></TableCell>
                        <TableCell><strong>Acciones</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) => (
                        <TableRow key={restaurante.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fff3e0' } }}>
                            <TableCell>{restaurante.nombre}</TableCell>
                            <TableCell>{restaurante.direccion}</TableCell>
                            <TableCell>
                                <CustomSwitch
                                    checked={restaurante.activo}
                                    onChange={(e) =>
                                        alActualizarEstRestaurante(restaurante.id, e.target.checked)
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" startIcon={<EditIcon />} sx={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#f57c00' } }}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default RestauranteList;
