import { useNavigate } from "react-router-dom";

export default function CarritoScreen() {
  const navigate = useNavigate();

  // Ejemplo de lista de ítems en el carrito (puedes obtenerlos de tu contexto o API)
  const itemsCarrito = [
    {
      id: 1,
      etiqueta: "Título",
      descripcion: "Descripción Descripción",
      imagen: "https://via.placeholder.com/100x80?text=Platillo+1",
    },
    {
      id: 2,
      etiqueta: "Título",
      descripcion: "Descripción Descripción",
      imagen: "https://via.placeholder.com/100x80?text=Platillo+2",
    },
    {
      id: 3,
      etiqueta: "Título",
      descripcion: "Descripción Descripción",
      imagen: "https://via.placeholder.com/100x80?text=Platillo+3",
    },
  ];

  const handleVolver = () => {
    navigate(-1); // o navigate("/menu") si prefieres
  };

  const handleEliminar = (id: number) => {
    alert(`Eliminar ítem con ID: ${id} (ejemplo)`);
  };

  const handleEnviarCocina = () => {
    alert("Enviar a cocina (ejemplo)");
  };

  const handleSeleccionProductos = () => {
    navigate("/menu"); // Ajusta la ruta a tu pantalla de productos
  };

  return (
    <div style={styles.phoneContainer}>
      {/* Barra superior */}
      <div style={styles.topBar}>
        <span style={styles.backButton} onClick={handleVolver}>
          ← Atrás
        </span>
        <h1 style={styles.title}>Mi Orden</h1>
      </div>

      {/* Contenedor principal */}
      <div style={styles.content}>
        {/* Lista de ítems */}
        {itemsCarrito.map((item) => (
          <div key={item.id} style={styles.itemCard}>
            <img
              src={item.imagen}
              alt={item.etiqueta}
              style={styles.itemImage}
            />
            <div style={styles.itemInfo}>
              <p style={styles.itemTag}>Etiqueta</p>
              <p style={styles.itemTitle}>{item.etiqueta}</p>
              <p style={styles.itemDesc}>{item.descripcion}</p>
            </div>
            <button style={styles.deleteButton} onClick={() => handleEliminar(item.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Botones inferiores */}
      <div style={styles.buttonsContainer}>
        <button style={styles.enviarButton} onClick={handleEnviarCocina}>
          Enviar a cocina
        </button>
        <button style={styles.seleccionButton} onClick={handleSeleccionProductos}>
          Ir a selección de productos
        </button>
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
  },
  topBar: {
    height: "60px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    padding: "0 1rem",
  },
  backButton: {
    fontSize: "1rem",
    cursor: "pointer",
    color: "#333",
    marginRight: "auto",
  },
  title: {
    fontSize: "1.4rem",
    margin: 0,
    color: "#e53935",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "0.5rem",
    gap: "0.5rem",
    background: "#fff",
  },
  itemImage: {
    width: "80px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  itemTag: {
    fontSize: "0.8rem",
    color: "#999",
    margin: 0,
  },
  itemTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    margin: "0.2rem 0",
    color: "#333",
  },
  itemDesc: {
    fontSize: "0.9rem",
    color: "#666",
    margin: 0,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 0.6rem",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
  },
  enviarButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  seleccionButton: {
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
