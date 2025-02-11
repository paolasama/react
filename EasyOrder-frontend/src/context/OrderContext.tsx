// Importaciones propias de React -> módulos, hooks, etc.
import React, { createContext, useContext, useState, useEffect, FunctionComponent } from 'react';

// ** Interface para los elementos de la orden **
interface OrderItem {
    id: number;                    // Identificador único del producto (ej. ID de la base de datos)
    nombreElemento: string;        // Nombre del producto (ej. "Pizza Margherita")
    cantidad: number;              // Cantidad de unidades del producto que el usuario desea
    imagenURL?: string;            // URL de la imagen del producto (opcional, puede no tener)
    instrucciones?: string;        // Instrucciones especiales (ej. "Sin cebolla", "Extra queso", etc.)
    sessionId?: number | null;     // ID de la sesión activa (opcional, se usa para identificar la orden)
}

// ** Interface de las Props del componente OrderContext **
interface OrderContextProps {
    order: OrderItem[];            // Lista de los productos en la orden
    addToOrder: (item: Omit<OrderItem, 'sessionId'>) => void;  // Función para agregar un producto a la orden
    removeFromOrder: (id: number) => void;  // Función para eliminar un producto de la orden usando su ID
    clearOrder: () => void;        // Función para vaciar la orden por completo
    sessionId: number | null;      // ID de la sesión del usuario, si está disponible
    setSessionId: (id: number) => void;  // Función para establecer el ID de la sesión
}

// ** Creación del contexto de la orden **
const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// ** Proveedor del contexto de la orden **
export const OrderProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    // Estado local para almacenar la orden del usuario
    const [order, setOrder] = useState<OrderItem[]>(() => {
        // Intentamos recuperar la orden guardada en localStorage (si existe)
        const savedOrder = localStorage.getItem('order');
        return savedOrder ? JSON.parse(savedOrder) : []; // Si no hay nada guardado, devolvemos un array vacío
    });

    // Estado para almacenar el ID de la sesión
    const [sessionId, setSessionId] = useState<number | null>(() => {
        // Intentamos recuperar el sessionId guardado en localStorage (si existe)
        const savedSession = localStorage.getItem('sessionId');
        return savedSession ? JSON.parse(savedSession) : null; // Si no hay nada guardado, devolvemos null
    });

    // ** Guardar la orden en el localStorage cada vez que cambie el estado de la orden **
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order)); // Guardamos la orden actual en el localStorage
    }, [order]); // Este efecto se ejecutará cada vez que cambie el estado de la orden

    // ** Guardar el sessionId en el localStorage cada vez que cambie **
    useEffect(() => {
        if (sessionId !== null) {
            localStorage.setItem('sessionId', JSON.stringify(sessionId)); // Guardamos el sessionId en localStorage
        }
    }, [sessionId]); // Este efecto se ejecutará cada vez que cambie el sessionId

    // ** Función para agregar un artículo a la orden **
    const addToOrder = (item: Omit<OrderItem, 'sessionId'>) => {
        setOrder((prevOrder) => {
            const existingItem = prevOrder.find((i) => i.id === item.id); // Comprobamos si el artículo ya está en la orden
            if (existingItem) {
                // Si el artículo ya existe en la orden, simplemente aumentamos la cantidad
                return prevOrder.map((i) =>
                    i.id === item.id
                        ? { ...i, cantidad: i.cantidad + item.cantidad, instrucciones: item.instrucciones || i.instrucciones }
                        : i
                );
            }
            // Si el artículo no existe en la orden, lo agregamos a la lista
            return [...prevOrder, { ...item, sessionId }];
        });
    };

    // ** Función para eliminar un artículo de la orden usando su ID **
    const removeFromOrder = (id: number) => {
        setOrder((prevOrder) => prevOrder.filter((item) => item.id !== id)); // Filtramos el artículo con ese ID
    };

    // ** Función para vaciar la orden (eliminar todos los artículos) **
    const clearOrder = () => {
        setOrder([]); // Establecemos el estado de la orden como un array vacío
        localStorage.removeItem('order'); // Limpiamos la orden guardada en localStorage
    };

    // ** Proveedor del contexto que pasa los valores a los componentes hijos **
    return (
        <OrderContext.Provider value={{ order, addToOrder, removeFromOrder, clearOrder, sessionId, setSessionId }}>
            {children} {/* Renderiza los componentes hijos que puedan usar el contexto */}
        </OrderContext.Provider>
    );
};

// ** Hook personalizado para acceder al contexto de la orden en cualquier parte de la aplicación **
export const useOrder = (): OrderContextProps => {
    const context = useContext(OrderContext); // Accedemos al contexto
    if (!context) {
        // Si intentamos usar el hook fuera del OrderProvider, lanzamos un error
        throw new Error('useOrder debe usarse dentro de un OrderProvider');
    }
    return context; // Retornamos el valor del contexto
};
