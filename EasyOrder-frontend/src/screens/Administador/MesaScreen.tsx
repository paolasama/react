import React from 'react';
import MesaForm from '../../components/Administrador/Mesa/indexFrom';
import MesaList from '../../components/Administrador/Mesa/indexList';

const MesaScreen: React.FC = () => {
    const handleSuccess = () => {
        console.log('Formulario enviado exitosamente');
    };

    return (
        <div>
            <h1>Gestión de Mesas</h1>
            <MesaForm onSuccess={handleSuccess} />
            <MesaList />
        </div>
    );
};

export default MesaScreen;
