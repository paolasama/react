import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/** Interfaz para la categoría */
interface Categoria {
  id: number;
  nombre: string;
  icono?: string;
}

/** Interfaz para cada ítem del menú */
interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: number;
  activo: boolean;
  imagen?: string;
}

/** Estilos en línea */
const styles = {
  phoneContainer: {
    width: "375px",
    height: "812px",
    margin: "2rem auto",
    border: "1px solid #ccc",
    borderRadius: "30px",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    background: "#fff",
    fontFamily: "Poppins, sans-serif",
    position: "relative" as const,
  },
  topCategories: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "#fff",
    borderBottom: "1px solid #ddd",
  },
  categoryItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    fontSize: "0.8rem",
    color: "#555",
    cursor: "pointer",
    padding: "0 0.5rem",
  },
  categoryIcon: {
    fontSize: "1.2rem",
    marginBottom: "3px",
  },
  itemGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
    padding: "1rem",
    background: "#fafafa",
    overflowY: "auto" as const,
  },
  itemCard: {
    display: "flex",
    flexDirection: "column" as const,
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
  },
  itemImage: {
    width: "100%",
    height: "100px",
    objectFit: "cover" as const,
  },
  itemLabel: {
    padding: "0.5rem",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#333",
  },
  bottomNav: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "#fff",
    borderTop: "1px solid #ddd",
  },
  navItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    color: "#555",
    cursor: "pointer",
  },
  navIcon: {
    fontSize: "1.2rem",
    marginBottom: "2px",
  },
  navItemHighlighted: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    color: "#ff5722",
    cursor: "pointer",
  },
  navIconHighlighted: {
    fontSize: "1.2rem",
    marginBottom: "2px",
    color: "#ff5722",
  },
};

const MiOrdenScreen: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Categoría seleccionada: null => muestra todos los ítems
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Para navegar
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Cargar categorías
    axios
      .get("http://localhost:3000/api/categorias")
      .then((res) => {
        const categoriasBD = res.data as Categoria[];
        const categoriasConIconos = categoriasBD.map((cat) => {
          switch (cat.nombre.toLowerCase()) {
            case "desayunos":
              return { ...cat, icono: "🍳" };
            case "general":
            case "inicio":
              return { ...cat, icono: "🏠" };
            case "entradas":
              return { ...cat, icono: "🥗" };
            case "platillos":
              return { ...cat, icono: "🍽️" };
            case "bebidas":
              return { ...cat, icono: "🍹" };
            case "postres":
              return { ...cat, icono: "🍰" };
            default:
              return { ...cat, icono: "🍴" };
          }
        });
        setCategorias(categoriasConIconos);
      })
      .catch((err) => {
        console.error("Error al cargar categorías:", err);
        setError(true);
      });

    // 2. Cargar ítems
    axios
      .get("http://localhost:3000/api/menu-items")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar items:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Filtrar ítems por la categoría seleccionada
  const filteredItems = selectedCategory
    ? items.filter((item) => item.categoria_id === selectedCategory)
    : items;

  return (
    <div style={styles.phoneContainer}>
      {/* Barra superior con categorías */}
      <div style={styles.topCategories}>
        {categorias.map((cat) => (
          <div
            key={cat.id}
            style={styles.categoryItem}
            onClick={() => {
              if (
                cat.nombre.toLowerCase() === "general" ||
                cat.nombre.toLowerCase() === "inicio"
              ) {
                setSelectedCategory(null);
              } else {
                setSelectedCategory(cat.id);
              }
            }}
          >
            <span style={styles.categoryIcon}>{cat.icono || "🍴"}</span>
            <span>{cat.nombre}</span>
          </div>
        ))}
      </div>

      {/* Grid de ítems */}
      <div style={styles.itemGrid}>
        {loading && <p>Cargando...</p>}
        {error && <p>Error al cargar los ítems</p>}

        {!loading &&
          !error &&
          filteredItems.map((item) => (
            <div
              key={item.id}
              style={styles.itemCard}
              // Al hacer clic, navega a /detalle/:id (o la ruta que quieras)
              onClick={() => navigate(`/detalle/${item.id}`)}
            >
              <img
                src={`http://localhost:3000/uploads/${item.imagen}`}
                alt={item.nombre}
                style={styles.itemImage}
              />
              <span style={styles.itemLabel}>{item.nombre}</span>
            </div>
          ))}
      </div>

      {/* Barra de navegación inferior */}
      <div style={styles.bottomNav}>
        <div style={styles.navItem} onClick={() => navigate("/menu")}>
          <span style={styles.navIcon}>📋</span>
          <span>Menú</span>
        </div>
        <div style={styles.navItem} onClick={() => navigate("/buscar")}>
          <span style={styles.navIcon}>🔍</span>
          <span>Buscar</span>
        </div>
        <div style={styles.navItemHighlighted}>
          <span style={styles.navIconHighlighted}>📦</span>
          <span>Enviar pedido</span>
        </div>
        <div style={styles.navItem} onClick={() => navigate("/ayuda")}>
          <span style={styles.navIcon}>❓</span>
          <span>Ayuda</span>
        </div>
        <div style={styles.navItem} onClick={() => navigate("/pagar")}>
          <span style={styles.navIcon}>💳</span>
          <span>Pagar</span>
        </div>
      </div>
    </div>
  );
};

export default MiOrdenScreen;
