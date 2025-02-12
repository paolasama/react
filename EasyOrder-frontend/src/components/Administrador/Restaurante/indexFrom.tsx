import { useCallback } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import servicioRestaurante from '../../../services/Administrador/servicioRestaurante';

interface FormProps {
    alAgregarRestaurante: (nuevoRestaurante: { nombre: string; direccion?: string; activo: boolean }) => void;
}

const RestauranteForm: React.FC<FormProps> = ({ alAgregarRestaurante }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { nombre: '', direccion: '', activo: true },
    });

    const onSubmit = useCallback(async (data: { nombre: string; direccion?: string; activo: boolean }) => {
        try {
            await servicioRestaurante.crearRestaurante(data);
            alAgregarRestaurante(data);
            reset();
        } catch (error) {
            console.error('🚨 Error al registrar el restaurante:', error);
        }
    }, [alAgregarRestaurante, reset]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller name="nombre" control={control} render={({ field }) => <TextField {...field} label="Nombre" required fullWidth />} />
            <Controller name="direccion" control={control} render={({ field }) => <TextField {...field} label="Dirección" fullWidth />} />
            <Button type="submit" variant="contained">Registrar</Button>
        </Box>
    );
};

export default RestauranteForm;
