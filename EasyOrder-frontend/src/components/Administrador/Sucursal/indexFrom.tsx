import React, { useState } from 'react';

interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: string;
}

interface SucursalFormProps {
    onAddSucursal: (nuevaSucursal: Sucursal) => void; // ✅ Se añadió la prop correctamente
}

const SucursalForm: React.FC<SucursalFormProps> = ({ onAddSucursal }) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [restaurante, setRestaurante] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevaSucursal: Sucursal = {
            id: Date.now(),
            nombre,
            direccion,
            restaurante,
        };
        onAddSucursal(nuevaSucursal);
        setNombre('');
        setDireccion('');
        setRestaurante('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de la sucursal" required />
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" required />
            <input type="text" value={restaurante} onChange={(e) => setRestaurante(e.target.value)} placeholder="Restaurante" required />
            <button type="submit">Agregar Sucursal</button>
        </form>
    );
};

export default SucursalForm;
