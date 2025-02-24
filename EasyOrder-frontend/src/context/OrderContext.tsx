import { createContext, useState, useEffect, ReactNode } from "react";

/** Interfaz para un ítem de la orden */
interface OrderItem {
  id: number;
  nombreElemento: string;
  cantidad: number;
  imagenURL?: string;
  instrucciones?: string;
  sessionId?: number | null;
}

/** Interfaz del contexto que manejamos */
interface OrderContextProps {
  order: OrderItem[];
  addToOrder: (item: Omit<OrderItem, "sessionId">) => void;
  removeFromOrder: (id: number) => void;
  clearOrder: () => void;
  sessionId: number | null;
  setSessionId: (id: number) => void;
}

/** Creamos el contexto (solo uso interno) */
const OrderContext = createContext<OrderContextProps | undefined>(undefined);

/**
 * Componente Provider (export default)
 * Envuelve la aplicación y provee el estado de la orden
 */
export default function OrderProvider({ children }: { children: ReactNode }) {
  // Estado local para la orden
  const [order, setOrder] = useState<OrderItem[]>(() => {
    const savedOrder = localStorage.getItem("order");
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  // Estado para el sessionId
  const [sessionId, setSessionId] = useState<number | null>(() => {
    const savedSession = localStorage.getItem("sessionId");
    return savedSession ? JSON.parse(savedSession) : null;
  });

  // Guardar la orden en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  // Guardar el sessionId en localStorage cada vez que cambie
  useEffect(() => {
    if (sessionId !== null) {
      localStorage.setItem("sessionId", JSON.stringify(sessionId));
    }
  }, [sessionId]);

  // Función para agregar un ítem a la orden
  function addToOrder(item: Omit<OrderItem, "sessionId">) {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((i) => i.id === item.id);
      if (existingItem) {
        return prevOrder.map((i) =>
          i.id === item.id
            ? {
                ...i,
                cantidad: i.cantidad + item.cantidad,
                instrucciones: item.instrucciones || i.instrucciones,
              }
            : i
        );
      }
      return [...prevOrder, { ...item, sessionId }];
    });
  }

  // Función para eliminar un ítem de la orden
  function removeFromOrder(id: number) {
    setOrder((prevOrder) => prevOrder.filter((item) => item.id !== id));
  }

  // Función para limpiar la orden
  function clearOrder() {
    setOrder([]);
    localStorage.removeItem("order");
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        addToOrder,
        removeFromOrder,
        clearOrder,
        sessionId,
        setSessionId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
