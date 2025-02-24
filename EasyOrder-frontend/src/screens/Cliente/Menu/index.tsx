import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria?: {
    id: number;
    nombre: string;
  };
  activo: boolean;
  imagen?: string;
}

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
  topBar: {
    height: "60px",
    background: "#fefefe",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
  },
  leftIcons: {
    display: "flex",
    gap: "1rem",
  },
  rightIcons: {
    display: "flex",
    gap: "1rem",
    cursor: "pointer",
  },
  icon: {
    fontSize: "1.3rem",
    cursor: "pointer",
  },
  title: {
    fontSize: "1.5rem",
    margin: 0,
    color: "#e53935",
    fontWeight: "bold",
  },
  imageGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "3px",
    background: "#fafafa",
    overflowY: "auto" as const,
    padding: "4px",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    borderRadius: "5px",
    padding: "4px",
  },
  imageStyle: {
    width: "100%",
    height: "100px",
    objectFit: "cover" as const,
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  imageStyleHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
  },
  itemTitle: {
    margin: "0.5rem 0 0.2rem",
    fontWeight: "bold",
    fontSize: "0.9rem",
    textAlign: "center" as const,
    color: "#333",
  },
  bottomNav: {
    height: "60px",
    background: "#fefefe",
    borderTop: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    color: "#555",
    cursor: "pointer",
    width: "20%",
  },
  navIcon: {
    fontSize: "1.2rem",
  },
};

const MenuClienteScreen: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/menu-items") // Ajusta la URL si es diferente
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.phoneContainer}>
      {/* Barra superior */}
      <div style={styles.topBar}>
        <div style={styles.leftIcons}>
          <span style={styles.icon}>🏠</span>
          <span style={styles.icon}>🔔</span>
        </div>
        <h1 style={styles.title}>Panamá</h1>
        <div style={styles.rightIcons} onClick={() => navigate("/carrito")}>
          <span style={styles.icon}>🛒</span>
        </div>
      </div>

      {/* Grid de imágenes */}
      <div style={styles.imageGrid}>
        {loading && <p>Cargando...</p>}
        {error && <p>Error al cargar el menú</p>}
        {!loading &&
          !error &&
          menuItems.map((item) => (
            <div key={item.id} style={styles.itemContainer}>
              {/* Solo la imagen es clickeable */}
              <HoverableImage
                src={`http://localhost:3000/uploads/${item.imagen}`}
                alt={item.nombre}
                onClick={() => navigate("/mi-orden")} // <-- Al hacer clic en la imagen, ve a /pedido
              />
              <p style={styles.itemTitle}>{item.nombre}</p>
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

        <div style={styles.navItem} onClick={() => navigate("/mi-orden")}>
          <span style={styles.navIcon}>📦</span>
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

/** Componente para manejar el hover de la imagen */
interface HoverableImageProps {
  src: string;
  alt: string;
  onClick?: () => void; // <-- Nueva prop onClick opcional
}

const HoverableImage: React.FC<HoverableImageProps> = ({ src, alt, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick} // <-- Aplica la prop onClick aquí
      style={{
        ...styles.imageStyle,
        ...(hover ? styles.imageStyleHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default MenuClienteScreen;
