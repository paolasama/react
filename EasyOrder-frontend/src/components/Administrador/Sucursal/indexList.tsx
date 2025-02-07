import React from 'react';

interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: string;
}

const SucursalList: React.FC<{ sucursales: Sucursal[] }> = ({ sucursales }) => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Lista de Sucursales</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Dirección</th>
                        <th style={styles.th}>Restaurante</th>
                        <th style={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sucursales.map((sucursal) => (
                        <tr key={sucursal.id}>
                            <td style={styles.td}>{sucursal.nombre}</td>
                            <td style={styles.td}>{sucursal.direccion}</td>
                            <td style={styles.td}>{sucursal.restaurante}</td>
                            <td style={styles.td}>
                                <button style={styles.button}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        margin: '20px auto',
        maxWidth: '800px',
        borderRadius: '8px',
        padding: '10px',
        background: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center' as const,
        marginBottom: '20px',
        fontSize: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
    },
    th: {
        background: '#2196f3',
        color: '#fff',
        padding: '10px',
        border: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '5px 10px',
        background: '#2196f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default SucursalList;
