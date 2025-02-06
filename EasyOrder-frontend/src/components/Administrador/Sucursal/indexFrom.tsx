import React, { useState } from 'react';

interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: string;
}

interface SucursalFormProps {
    onAddSucursal: (sucursal: Sucursal) => void;
}

const SucursalForm: React.FC<SucursalFormProps> = ({ onAddSucursal }) => {
    const [nombreSucursal, setNombreSucursal] = useState('');
    const [direccion, setDireccion] = useState('');
    const [restauranteSeleccionado, setRestauranteSeleccionado] = useState('');
    const restaurantes = ['El Mochomos', 'Rico Mexicano Restaurante', 'Pa’i Sushi', 'El Gallito Restaurante'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevaSucursal: Sucursal = {
            id: Date.now(),
            nombre: nombreSucursal,
            direccion,
            restaurante: restauranteSeleccionado,
        };
        onAddSucursal(nuevaSucursal);
        setNombreSucursal('');
        setDireccion('');
        setRestauranteSeleccionado('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Registrar Nueva Sucursal</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="nombreSucursal" style={styles.label}>
                        Nombre de la sucursal:
                    </label>
                    <input
                        id="nombreSucursal"
                        value={nombreSucursal}
                        onChange={(e) => setNombreSucursal(e.target.value)}
                        placeholder="Ej. Sucursal Centro"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="direccion" style={styles.label}>
                        Dirección:
                    </label>
                    <input
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Ej. Calle 123, Colonia Centro"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="restaurante" style={styles.label}>
                        Restaurante:
                    </label>
                    <select
                        id="restaurante"
                        value={restauranteSeleccionado}
                        onChange={(e) => setRestauranteSeleccionado(e.target.value)}
                        style={styles.input}
                        required
                    >
                        <option value="">Selecciona un restaurante</option>
                        {restaurantes.map((restaurante, index) => (
                            <option key={index} value={restaurante}>
                                {restaurante}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={styles.button}>
                    Registrar Sucursal
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '600px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9',
    },
    title: {
        textAlign: 'center' as const,
        marginBottom: '20px',
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
        fontSize: '14px',
        fontWeight: 'bold' as const,
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        background: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px',
        cursor: 'pointer',
    },
};

export default SucursalForm;
