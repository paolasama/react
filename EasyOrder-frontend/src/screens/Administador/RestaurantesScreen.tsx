/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Importaciones de React -> modulos, hooks, etc,.
import { FunctionComponent, useState, useEffect, } from 'react'
import { Box, Typography, Divider, Alert, Button, } from '@mui/material'
import { Link } from 'react-router-dom'
// Importaciones de Material-UI Icons
import StorefrontIcon from '@mui/icons-material/Storefront'
// Componentes propios
import RestauranteForm from '../../components/Administrador/Restaurante/indexFrom'
import RestauranteList from '../../components/Administrador/Restaurante/indexList'

// Servicios propios
import servicioRestaurante, { RestauranteProps, ActualizaRestauranteProps, } from '../../services/Administrador/servicioRestaurante'
// Interface de las Props de la pantalla RestaurantesScreen
interface Props{
    id: number;
    nombre: string;
    activo: boolean;
}
const RestaurantesScreen: FunctionComponent<Props> = () => {
    // hooks -> uso de los estados
    const [restaurantes,       setRestaurantes]       = useState<RestauranteProps[]>([])
    const [successMessage,     setSuccessMessage]     = useState<string | null>(null)
    const [errorMessage,       setErrorMessage]       = useState<string | null>(null)
    const [restauranteEditado, setRestauranteEditado] = useState<RestauranteProps | null>(null)
    /**
     ** Método para agregar un restaurante
     * @param nuevoRestaurante
     * */
    const AddRestaurante = (nuevoRestaurante: RestauranteProps) => {
        // Actualizar la lista de restaurantes
        setRestaurantes(restaurantesActuales => [
            // Operador de propagación -> copia el array de restaurantes actuales y agrega el nuevo restaurante
            ...restaurantesActuales, nuevoRestaurante
        ])
        // Se muestra el mensaje de confirmación
        const mensajeExito = `El restaurante "${nuevoRestaurante.nombre}" se ha registrado exitosamente.`
        setSuccessMessage(mensajeExito)
        // Limpiar el mensaje de éxito después de 3 segundos
        setTimeout(() => {
            setSuccessMessage(null)
        }, 3000)
    }
    /**
     ** Método para obtener todos los restaurantes
     * */
    const ObtRestaurantes = async () => {
        try {
            // Limpiar mensajes anteriores
            setErrorMessage(null)
            // Obtener datos del servidor
            const restaurantesObtenidos = await servicioRestaurante
                .getRestaurantes()
            // Validar que los datos no sean nulos, mediante un operador ternario
            restaurantesObtenidos
                ? setRestaurantes(restaurantesObtenidos)
                : setErrorMessage('No se recibieron datos del servidor')
            // Actualiza el estado con los nuevos datos
            setRestaurantes(restaurantesObtenidos)
        } catch (error: any) {
            // Muestra el mensaje de error
            setErrorMessage(error.response?.data?.message || 'Error al obtener los restaurantes. Por favor, intente nuevamente.')
            // Opcional: Mantener los datos anteriores en caso de error
            console.error('Error al obtener restaurantes:', error)
        }
    }
    /**
     ** Método para actualizar un restaurante
     * @param idRestaurante       -- {id} del restaurante a actualizar
     * @param datosRestaurante    -- Datos del restaurante a actualizar
     * */
    const ActRestaurante = async (
        idRestaurante:    number,
        datosRestaurante: ActualizaRestauranteProps
    ) => {
        try {
            await servicioRestaurante
                .putRestauranteID(idRestaurante, datosRestaurante)
            // Actualizar estados después de una actualización exitosa
            setSuccessMessage(`El restaurante con ID ${idRestaurante} ha sido actualizado correctamente.`)
        } catch (err: any) {
            setErrorMessage(err.response?.data?.message || `Error al actualizar el restaurante con ID ${idRestaurante}.`)
            // Limpiar mensajes de éxito previos
            setSuccessMessage(null)
        }
    }
    /**
     ** Método para cambiar el estado de un restaurante
     * @author José Raúl Bañuelos Gámez
     * @param idRestaurante
     * @param isActive
     * */
    const ActEstadoRestaurante = async (idRestaurante: number, isActive: boolean) => {
        try {
            const updatedRestaurante = await servicioRestaurante
                .putRestauranteIDEstado(idRestaurante, isActive)
            // Actualizar el estado del restaurante en el estado local
            setRestaurantes((prevEstRestaurante) =>
                prevEstRestaurante.map((restaurante) =>
                    restaurante.id === idRestaurante ? { ...restaurante, activo: updatedRestaurante.activo } : restaurante
                )
            );
            setSuccessMessage(`El restaurante con ID ${idRestaurante} ha sido ${isActive ? 'activado' : 'desactivado'}.`);
        } catch (err: any) {
            setErrorMessage(err.response?.data?.message || 'Error al actualizar el estado del restaurante.');
        }
    };
    /**
     ** Método para seleccionar un restaurante para su edición
     * @author José Raúl Bañuelos Gámez
     * @param restauranteSelec    -- Restaurante seleccionado para editar
     * */
    const SelecRestauranteEditar = (restauranteSelec: RestauranteProps) => {
        // console.log('Restaurante editado:', restauranteSelec)
        setRestauranteEditado(restauranteSelec)
    }
    /**
     ** Efecto -> ejecuta el método para obtener todos los restaurantes
     * */
    useEffect(() => {
        const guardarRestaurantes = localStorage.getItem('restaurantes')
        guardarRestaurantes
            ? setRestaurantes(JSON.parse(guardarRestaurantes))
            : ObtRestaurantes()
    }, [])
    //la función debe ejecutarse en un useEffect cuando un restaurante cambia:
    useEffect(() => {
        ActRestaurante(2, { nombre: "Actualización Automática" });
    }, []);
    /**
     ** Efecto -> guarda los restaurantes en el localStorage
     * */
    useEffect(() => {
        localStorage.setItem('restaurantes', JSON.stringify(restaurantes));
    }, [restaurantes]);
    return (
        <Box
            sx={{
                alignItems:      'center',
                backgroundColor: '#F5F5F5',
                display:         'flex',
                flexDirection:   'column',
                justifyContent:  'center',
                minHeight:       '100vh',
                padding:         3,
            }}
        >
            <Button
                component = {Link}
                to        = "/sucursales"
                variant   = "text"
                startIcon = {<StorefrontIcon />}
                sx={{
                    color:         '#1976D2',
                    position:      'absolute',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color:           '#115293',
                        textDecoration:  'underline',
                    },
                    right:  20,
                    top:    20,
                    zIndex: 1000,
                }}
            >
                Gestión sucursales
            </Button>
            <Box sx={{ padding: 3 }}>
                <Box sx={{
                    alignItems:    'center',
                    display:       'flex',
                    flexDirection: 'column',
                    width:         '100%',
                    marginBottom:  3,
                }}>
                    <Typography
                        sx={{
                            textAlign: 'center'
                        }}
                        variant="h4"
                        gutterBottom
                    >
                        Gestión de Restaurantes
                    </Typography>
                    <Divider sx={{ width: '80%' }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                    {restauranteEditado ? 'Editar Restaurante' : 'Registrar un nuevo restaurante'}
                </Typography>
                <RestauranteForm
                    alAgregarRestaurante = {AddRestaurante}
                    /* restauranteParaEditar = {restauranteEditado ? {
                        nombre:    restauranteEditado.nombre,
                        direccion: restauranteEditado.direccion || undefined,
                        activo:    restauranteEditado.activo,
                    } : undefined}
                    alEditarRestaurante = {ActRestaurante} */
                />
                <Divider sx={{ marginY: 3 }} />
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                <Typography variant="h6" gutterBottom>
                    Lista de Restaurantes
                </Typography>
                <RestauranteList
                    restaurantes = {restaurantes}
                    alActualizarEstRestaurante = {ActEstadoRestaurante}
                    alEditarRestaurante        = {SelecRestauranteEditar}
                />
            </Box>
        </Box>
    )
}
export default RestaurantesScreen