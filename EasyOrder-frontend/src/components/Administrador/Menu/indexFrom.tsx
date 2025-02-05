import React, { useState } from 'react';
import axios from 'axios';
import { theme } from "../../../styles/theme"; // Ruta corregida

const RegistroMenu = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(false);

  const registrarMenu = async () => {
    try {
      const nuevoMenu = { nombre, descripcion, activo };
      await axios.post('http://localhost:3000/api/menus', nuevoMenu);
      alert('Menú registrado exitosamente');
      setNombre('');
      setDescripcion('');
      setActivo(false);
    } catch (error) {
      console.error('Error al registrar el menú:', error);
      alert('Hubo un error al registrar el menú');
    }
  };

  return (
    <div style={{
      backgroundColor: theme.colors.background, 
      padding: theme.spacing.medium, 
      maxWidth: '500px', 
      margin: 'auto', 
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Modificando el color del título a negro */}
      <h2 style={{ 
        color: '#000',  // Color negro
        textAlign: 'center', 
        marginBottom: theme.spacing.medium 
      }}>Registrar Menú</h2>
      
      <div style={{ marginBottom: theme.spacing.medium }}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del menú"
          style={{
            width: '100%',
            padding: theme.spacing.small,
            marginBottom: theme.spacing.small,
            borderRadius: '8px',
            border: `1px solid ${theme.colors.text}`,
            fontSize: '16px',
          }}
        />
      </div>
      
      <div style={{ marginBottom: theme.spacing.medium }}>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del menú"
          style={{
            width: '100%',
            padding: theme.spacing.small,
            marginBottom: theme.spacing.small,
            borderRadius: '8px',
            border: `1px solid ${theme.colors.text}`,
            fontSize: '16px',
          }}
        />
      </div>
      
      <div style={{ marginBottom: theme.spacing.medium }}>
        <label style={{ fontSize: '16px', color: theme.colors.text }}>
          Activo
          <input
            type="checkbox"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
            style={{ marginLeft: theme.spacing.small }}
          />
        </label>
      </div>
      
      <button
        onClick={registrarMenu}
        style={{
          width: '100%',
          backgroundColor: theme.colors.button,
          color: 'white',
          padding: theme.spacing.small,
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Registrar
      </button>
    </div>
  );
};

export default RegistroMenu;
