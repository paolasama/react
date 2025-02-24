import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  activo: boolean;
}

export default function ExitoScreen() {
  const navigate = useNavigate();

  // Estado para ítems recomendados
  const [recommended, setRecommended] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Carga de recomendaciones (solo 3, p.ej. con "?recomendado=true")
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/menu-items?recomendado=true")
      .then((res) => {
        setRecommended(res.data.slice(0, 3)); // Muestra solo los primeros 3
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleVolverMenu = () => {
    navigate("/menu");
  };

  // Ahora, en lugar de navegar a "/mi-orden", navegamos a "/carrito"
  const handleRevisarOrden = () => {
    navigate("/carrito");
  };

  // Función para "Agregar" un ítem recomendado (ejemplo)
  const handleAgregarRecomendado = (id: number) => {
    alert(`Ítem ${id} agregado a la orden (ejemplo).`);
  };

  return (
    <div style={styles.phoneContainer}>
      {/* Barra superior */}
      <div style={styles.topBar}>
        <span style={styles.backButton} onClick={() => navigate(-1)}>
          ← Atrás
        </span>
      </div>

      <div style={styles.content}>
        <h1 style={styles.successTitle}>
          Producto <span style={styles.highlight}>añadido</span> con éxito!
        </h1>

        <p style={styles.subtext}>Recomendaciones para ti</p>

        {loading && <p style={styles.infoText}>Cargando recomendaciones...</p>}
        {error && <p style={styles.infoText}>Error al cargar recomendaciones.</p>}

        {/* Grid de tarjetas, máximo 3 */}
        <div style={styles.recoGrid}>
          {!loading &&
            !error &&
            recommended.map((rec) => (
              <div key={rec.id} style={styles.card}>
                <img
                  src={`http://localhost:3000/uploads/${rec.imagen}`}
                  alt={rec.nombre}
                  style={styles.cardImage}
                />
                <p style={styles.cardTitle}>{rec.nombre}</p>
                <p style={styles.cardDesc}>{rec.descripcion}</p>
                <button
                  style={styles.cardButton}
                  onClick={() => handleAgregarRecomendado(rec.id)}
                >
                  Agregar
                </button>
              </div>
            ))}
        </div>

        <div style={styles.buttonsContainer}>
          <button style={styles.menuButton} onClick={handleVolverMenu}>
            Volver al menú
          </button>
          <button style={styles.orderButton} onClick={handleRevisarOrden}>
            Revisar orden
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  phoneContainer: {
    width: "375px",
    height: "812px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: "#fff",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
  },
  topBar: {
    height: "60px",
    background: "#fff",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    padding: "0 1rem",
  },
  backButton: {
    fontSize: "1rem",
    cursor: "pointer",
    color: "#333",
  },
  content: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
  },
  successTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#333",
  },
  highlight: {
    color: "#e53935",
  },
  subtext: {
    fontSize: "1rem",
    color: "#777",
    margin: 0,
  },
  infoText: {
    fontSize: "0.9rem",
    color: "#555",
  },
  recoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "0.5rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  cardTitle: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    margin: 0,
    color: "#333",
  },
  cardDesc: {
    fontSize: "0.8rem",
    margin: 0,
    color: "#666",
    minHeight: "2em",
    overflow: "hidden",
  },
  cardButton: {
    marginTop: "auto",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.3rem 0.5rem",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "1.5rem",
  },
  menuButton: {
    backgroundColor: "#ff5722",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  orderButton: {
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

