/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface SucursalFormProps {
    onAddSucursal: (sucursal: any) => void;
}

const SucursalForm: React.FC<SucursalFormProps> = ({ onAddSucursal }) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [restaurante, setRestaurante] = useState('');
    const restaurantes = [
        { id: 1, nombre: 'El Mochomos' },
        { id: 2, nombre: 'Rico Mexicano Restaurante' },
        { id: 3, nombre: 'Pa’i Sushi' },
        { id: 4, nombre: 'El Gallito Restaurante' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevaSucursal = {
            nombre,
            direccion,
            restaurante_id: Number(restaurante),
        };

        try {
            const response = await fetch('http://localhost:3000/api/sucursales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaSucursal),
            });

            if (!response.ok) {
                throw new Error('Error al registrar la sucursal');
            }

            const data = await response.json();
            onAddSucursal(data); // Actualiza la lista en el estado global
            alert('Sucursal registrada con éxito');
            setNombre('');
            setDireccion('');
            setRestaurante('');
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            alert('Hubo un problema al enviar la solicitud');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Registrar Nueva Sucursal</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="nombre" style={styles.label}>Nombre de la Sucursal:</label>
                    <input
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="direccion" style={styles.label}>Dirección:</label>
                    <input
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="restaurante" style={styles.label}>Restaurante:</label>
                    <select
                        id="restaurante"
                        value={restaurante}
                        onChange={(e) => setRestaurante(e.target.value)}
                        style={styles.input}
                        required
                    >
                        <option value="">Selecciona un restaurante</option>
                        {restaurantes.map((rest) => (
                            <option key={rest.id} value={rest.id}>
                                {rest.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={styles.button}>Registrar Sucursal</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '600px',
        borderRadius: '8px',
        background: '#f9f9f9',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center' as const,
        marginBottom: '20px',
        fontSize: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold' as const,
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        background: '#2196f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default SucursalForm;
