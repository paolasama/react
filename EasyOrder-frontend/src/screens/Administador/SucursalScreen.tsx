import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SucursalForm from '../../components/Administrador/Sucursal/indexFrom';
import SucursalList from '../../components/Administrador/Sucursal/indexList';

// Definimos el tipo Sucursal correctamente
interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  restauranteId: number; // Asegurarse de que restauranteId esté correctamente tipado
  Restaurante: {
    nombre: string; // Nombre del restaurante
  };
}

const SucursalScreen: React.FC = () => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/sucursales')
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar sucursales", error);
      });
  }, []);

  // Función que se pasa como prop para agregar una sucursal
  const addSucursal = (nuevaSucursal: Sucursal) => {
    setSucursales((prevSucursales) => [...prevSucursales, nuevaSucursal]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Sucursales</h1>
      {/* Pasamos la función addSucursal como prop */}
      <SucursalForm onAddSucursal={(nuevaSucursal: { nombre: string; direccion: string; restauranteId: number; }) => {
        axios.post('http://localhost:3000/api/sucursales', nuevaSucursal)
          .then((response) => {
            addSucursal(response.data);
          })
          .catch((error) => {
            console.error("Error al crear la sucursal", error);
          });
      }} />
      {/* Le pasamos el estado sucursales al componente SucursalList */}
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