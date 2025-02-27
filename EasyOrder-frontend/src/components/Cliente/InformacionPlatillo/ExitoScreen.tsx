import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  activo: boolean;
}

interface OrdenItem {
  itemId: number;
  nombre: string;
  cantidad: number;
  instrucciones: string;
  precio: number;
  imagen?: string; // Agregamos la propiedad imagen
}

export default function ExitoScreen() {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/menu-items");
        const menuItems: MenuItem[] = res.data;

        // Filtrar solo productos activos y seleccionar 4 aleatorios
        const productosActivos = menuItems.filter((item) => item.activo);
        const recomendaciones = productosActivos.sort(() => 0.5 - Math.random()).slice(0, 4);

        setRecommended(recomendaciones);
      } catch (error) {
        console.error("Error al obtener recomendaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleAgregarRecomendado = (rec: MenuItem) => {
    const nuevaOrden: OrdenItem = {
      itemId: rec.id,
      nombre: rec.nombre,
      cantidad: 1,
      instrucciones: "",
      precio: rec.precio,
      imagen: rec.imagen, // Se incluye la imagen
    };

    const carritoActual = localStorage.getItem("carrito");
    const carritoParseado: OrdenItem[] = carritoActual ? JSON.parse(carritoActual) : [];

    const indexExistente = carritoParseado.findIndex((item) => item.itemId === rec.id);
    if (indexExistente !== -1) {
      carritoParseado[indexExistente].cantidad += 1;
    } else {
      carritoParseado.push(nuevaOrden);
    }

    localStorage.setItem("carrito", JSON.stringify(carritoParseado));

    setMensaje(`Se agregó 1x ${rec.nombre} al pedido por $${rec.precio.toFixed(2)}.`);

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span onClick={() => navigate(-1)} style={styles.backButton}>&lt; Atrás</span>
      </div>

      <h1>Producto <span style={styles.highlight}>añadido</span> con éxito!</h1>
      <p style={styles.subtitle}>Recomendaciones para ti</p>

      {loading && <p style={styles.loadingText}>Cargando recomendaciones...</p>}

      <div style={styles.grid}>
        {!loading &&
          recommended.map((rec) => (
            <div key={rec.id} style={styles.card}>
              <img
                src={`http://localhost:3000/uploads/${rec.imagen}`}
                alt={rec.nombre}
                style={styles.image}
                onError={(e) =>
                  (e.currentTarget.src = "http://localhost:3000/uploads/default.png")
                }
              />
              <p style={styles.name}>{rec.nombre}</p>
              <p style={styles.description}>{rec.descripcion}</p>
              <p style={styles.price}>${rec.precio.toFixed(2)}</p>
              <button onClick={() => handleAgregarRecomendado(rec)} style={styles.addButton}>
                Agregar
              </button>
            </div>
          ))}
      </div>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}

      <div style={styles.buttonsContainer}>
        <button onClick={() => navigate("/menu")} style={styles.menuButton}>Volver al menú</button>
        <button onClick={() => navigate("/carrito")} style={styles.orderButton}>Revisar orden</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "10px",
  },
  backButton: {
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#333",
    textDecoration: "none",
  },
  highlight: {
    color: "#e53935",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  loadingText: {
    color: "#777",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },
  card: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  name: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
  description: {
    fontSize: "0.8rem",
    color: "#666",
    marginBottom: "5px",
  },
  price: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "green",
  },
  addButton: {
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: "5px",
    padding: "5px",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
  mensaje: {
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },
  menuButton: {
    backgroundColor: "#2AB7A2",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
  },
  orderButton: {
    backgroundColor: "#fff",
    color: "#2AB7A2",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    border: "2px solid #2AB7A2",
  },
};
