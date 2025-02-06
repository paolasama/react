import React, { useState } from 'react';
import SucursalForm from '../../components/Administrador/Sucursal/indexFrom';
import SucursalList from '../../components/Administrador/Sucursal/indexList';

interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: string;
}

const SucursalScreen: React.FC = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);

    const addSucursal = (nuevaSucursal: Sucursal) => {
        setSucursales([...sucursales, nuevaSucursal]);
    };

    return (
        <div>
            {/* Formulario para agregar sucursales */}
            <SucursalForm onAddSucursal={addSucursal} />

            {/* Lista de sucursales */}
            <SucursalList sucursales={sucursales} />
        </div>
    );
};

export default SucursalScreen;
