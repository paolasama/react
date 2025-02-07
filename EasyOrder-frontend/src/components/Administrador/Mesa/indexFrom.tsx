import React from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Restaurant, TableBar } from '@mui/icons-material';

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
        <Paper
            elevation={6}
            sx={{
                maxWidth: 400,
                margin: 'auto',
                padding: 4,
                borderRadius: 3,
                backgroundColor: '#fff8e1', // Un color cálido
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center">
                    <Restaurant fontSize="large" sx={{ marginRight: 1 }} />
                    Registrar Mesa
                </Typography>
                
                <TextField
                    label="Nombre de la Mesa"
                    id="nombreMesa"
                    name="nombreMesa"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                        startAdornment: <TableBar sx={{ color: 'gray' }} />,
                    }}
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
                    color="secondary"
                    sx={{
                        alignSelf: 'center', // Centrar el botón
                        width: '50%',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    Guardar
                </Button>
            </Box>
        </Paper>
    );
};

export default MesaForm;