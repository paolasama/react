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
        setSucursales((prevSucursales) => [...prevSucursales, nuevaSucursal]);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gestión de Sucursales</h1>
            <SucursalForm onAddSucursal={addSucursal} />
            <SucursalList sucursales={sucursales} />
        </div>
    );
};

const styles = {
    container: {
        margin: '20px auto',
        maxWidth: '800px',
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center' as const,
        fontSize: '24px',
        marginBottom: '20px',
    },
};

export default SucursalScreen;