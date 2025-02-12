import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { Restaurante } from '../../../services/Administrador/servicioRestaurante';

interface ListProps {
    restaurantes: Restaurante[];
    alActualizarEstRestaurante?: (id: number, isActive: boolean) => void; // ✅ Se añadió como prop opcional
}

const RestauranteList: React.FC<ListProps> = ({ restaurantes, alActualizarEstRestaurante }) => {
    return (
        <ul>
            {restaurantes.map((rest) => (
                <li key={rest.id}>
                    {rest.nombre} - {rest.activo ? 'Activo' : 'Inactivo'}
                    {alActualizarEstRestaurante && (
                        <button onClick={() => alActualizarEstRestaurante(rest.id, !rest.activo)}>
                            {rest.activo ? 'Desactivar' : 'Activar'}
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default RestauranteList;
