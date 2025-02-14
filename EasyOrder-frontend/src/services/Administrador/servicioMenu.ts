interface Menu {
    id: number;
    name: string;
    branch: string;
    active: boolean;
  }
  
  const STORAGE_KEY = "menus";
  
  /**
   * Obtiene la lista de menús almacenados en localStorage.
   */
  export const getMenus = (): Menu[] => {
    const storedMenus = localStorage.getItem(STORAGE_KEY);
    return storedMenus ? JSON.parse(storedMenus) : [];
  };
  
  /**
   * Agrega un nuevo menú y lo guarda en localStorage.
   */
  export const addMenu = (newMenu: Menu): void => {
    const menus = getMenus();
    menus.push(newMenu);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  };
  
  /**
   * Elimina un menú por ID.
   */
  export const deleteMenu = (id: number): void => {
    const menus = getMenus().filter(menu => menu.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  };
  