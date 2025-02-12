import React from 'react';

interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: string;
}

interface SucursalListProps {
    sucursales: Sucursal[]; // ✅ Se añadió la prop correctamente
}

const SucursalList: React.FC<SucursalListProps> = ({ sucursales }) => {
    return (
        <ul>
            {sucursales.map((sucursal) => (
                <li key={sucursal.id}>
                    <strong>{sucursal.nombre}</strong> - {sucursal.direccion} ({sucursal.restaurante})
                </li>
            ))}
        </ul>
    );
};

export default SucursalList;
