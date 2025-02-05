import React, { createContext, useState, ReactNode } from 'react';

// Definir el tipo para el contexto
interface OrderContextType {
  order: string[]; // Aquí estamos especificando que order es un array de strings
  setOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

const OrderContext = createContext<OrderContextType | null>(null);

interface OrderProviderProps {
  children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [order, setOrder] = useState<string[]>([]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
