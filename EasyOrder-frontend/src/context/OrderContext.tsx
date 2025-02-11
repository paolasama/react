/**
 ** NOTA: Componente que define el contexto de la aplicación EasyOrder. 
 * 
 * OrderContext.tsx - Contexto para la gestión centralizada del pedido
 * Actualizado por Raúl Bañuelos - 17/12/2024
 */

// Importaciones propias de React -> módulos, hooks, etc.
import React, { createContext, useContext, useState, useEffect, FunctionComponent } from 'react';

// Interface para los elementos de la orden
interface OrderItem {
    id: number;                    // Identificador único del producto
    nombreElemento: string;        // Nombre del producto
    cantidad: number;              // Cantidad del producto
    imagenURL?: string;            // URL de la imagen del producto (opcional)
    instrucciones?: string;        // Instrucciones especiales (opcional)
    sessionId?: number | null;     // ID de la sesión activa (opcional)
}

// Interface de las Props del componente OrderContext
interface OrderContextProps {
    order: OrderItem[];
    addToOrder: (item: Omit<OrderItem, 'sessionId'>) => void;
    removeFromOrder: (id: number) => void;
    clearOrder: () => void;
    sessionId: number | null;
    setSessionId: (id: number) => void;
}

// Creación del contexto
const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// Proveedor del contexto
export const OrderProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<OrderItem[]>(() => {
        const savedOrder = localStorage.getItem('order');
        return savedOrder ? JSON.parse(savedOrder) : [];
    });

    const [sessionId, setSessionId] = useState<number | null>(() => {
        const savedSession = localStorage.getItem('sessionId');
        return savedSession ? JSON.parse(savedSession) : null;
    });

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    useEffect(() => {
        if (sessionId !== null) {
            localStorage.setItem('sessionId', JSON.stringify(sessionId));
        }
    }, [sessionId]);

    const addToOrder = (item: Omit<OrderItem, 'sessionId'>) => {
        setOrder((prevOrder) => {
            const existingItem = prevOrder.find((i) => i.id === item.id);
            if (existingItem) {
                return prevOrder.map((i) =>
                    i.id === item.id
                        ? { ...i, cantidad: i.cantidad + item.cantidad, instrucciones: item.instrucciones || i.instrucciones }
                        : i
                );
            }
            return [...prevOrder, { ...item, sessionId }];
        });
    };

    const removeFromOrder = (id: number) => {
        setOrder((prevOrder) => prevOrder.filter((item) => item.id !== id));
    };

    const clearOrder = () => {
        setOrder([]);
        localStorage.removeItem('order');
    };

    return (
        <OrderContext.Provider value={{ order, addToOrder, removeFromOrder, clearOrder, sessionId, setSessionId }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = (): OrderContextProps => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder debe usarse dentro de un OrderProvider');
    }
    return context;
};
