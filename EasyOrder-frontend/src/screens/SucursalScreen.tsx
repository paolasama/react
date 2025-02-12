import { useState } from "react";
import SucursalForm from "../components/Administrador/Sucursal/indexFrom"; // ✅ Ruta corregida
import SucursalList from "../components/Administrador/Sucursal/indexList"; // ✅ Ruta corregida

interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: string;
}

const SucursalScreen = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);

    const addSucursal = (nuevaSucursal: Sucursal) => {
        setSucursales((prevSucursales) => [...prevSucursales, nuevaSucursal]);
    };

    return (
        <div>
            <h1>Gestión de Sucursales</h1>
            <SucursalForm onAddSucursal={addSucursal} />
            <SucursalList sucursales={sucursales} />
        </div>
    );
};

export default SucursalScreen;
