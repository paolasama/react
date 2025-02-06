import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface MesaFormProps {
    onSuccess: () => void;
}

const MesaForm: React.FC<MesaFormProps> = ({ onSuccess }) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Formulario procesado');
        onSuccess();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2, // Espaciado entre los elementos
                backgroundColor: 'background.paper',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Formulario de Mesa
            </Typography>
            <TextField
                label="Nombre de la Mesa"
                id="nombreMesa"
                name="nombreMesa"
                variant="outlined"
                fullWidth
                required
            />
            <TextField
                label="Capacidad"
                id="capacidadMesa"
                name="capacidadMesa"
                type="number"
                variant="outlined"
                fullWidth
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    alignSelf: 'flex-end', // Alinear el botón a la derecha
                }}
            >
                Guardar
            </Button>
        </Box>
    );
};

export default MesaForm;
