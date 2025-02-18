interface Sucursal {
    id: number;
    nombre: string;
    direccion: string;
    restaurante: string;
    activa: boolean;
  }
  
  const STORAGE_KEY = "sucursales";
  
  export const getSucursales = (): Sucursal[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };
  
  export const addSucursal = (nuevaSucursal: Sucursal): void => {
    const sucursales = getSucursales();
    sucursales.push(nuevaSucursal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sucursales));
  };
  
  export const toggleSucursalActiva = (id: number): void => {
    const sucursales = getSucursales().map((sucursal) =>
      sucursal.id === id ? { ...sucursal, activa: !sucursal.activa } : sucursal
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sucursales));
  };
  
  export const deleteSucursal = (id: number): void => {
    const sucursales = getSucursales().filter((sucursal) => sucursal.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sucursales));
  };
  