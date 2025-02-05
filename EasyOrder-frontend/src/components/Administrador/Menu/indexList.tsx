import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definir un tipo para el menú
interface Menu {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

const ListaMenu = () => {
  const [menus, setMenus] = useState<Menu[]>([]); // Usar el tipo definido
  const [loading, setLoading] = useState<boolean>(true); // Para manejar el estado de carga

  useEffect(() => {
    // Obtener los menús desde la API
    const obtenerMenus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/menus'); // Asegúrate de que la URL sea correcta
        setMenus(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los menús:', error);
        setLoading(false);
      }
    };

    obtenerMenus();
  }, []);

  const editarMenu = (id: number) => {
    console.log(`Editar menú con id: ${id}`);
    // Aquí iría la lógica para editar un menú, como abrir un modal o formulario.
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Lista de Menús</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menus.length === 0 ? (
            <tr>
              <td colSpan={4}>No hay menús disponibles.</td>
            </tr>
          ) : (
            menus.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.nombre}</td>
                <td>{menu.descripcion}</td>
                <td>{menu.activo ? 'Sí' : 'No'}</td>
                <td>
                  <button onClick={() => editarMenu(menu.id)}>Editar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMenu;
