import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CarritoItem {
  itemId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string; // Imagen es opcional
}

export default function CarritoScreen() {
  const navigate = useNavigate();
  const [itemsCarrito, setItemsCarrito] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarCarrito = () => {
      try {
        const carritoGuardado = localStorage.getItem("carrito");
        const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

        // Filtra solo los items válidos
        const itemsValidos = carrito.filter(
          (item: CarritoItem) => item.itemId && item.nombre && item.precio
        );
        setItemsCarrito(itemsValidos);
      } catch (error) {
        console.error("Error al leer carrito desde localStorage:", error);
        setItemsCarrito([]);
      } finally {
        setLoading(false);
      }
    };

    cargarCarrito();
  }, []);

  const handleVolver = () => navigate(-1);

  // Esta función ahora disminuye la cantidad del ítem en 1.
  // Si la cantidad queda en 0, se elimina el ítem por completo.
  const handleEliminar = (id: number) => {
    const nuevoCarrito = itemsCarrito
      .map((item) => {
        if (item.itemId === id) {
          if (item.cantidad > 1) {
            return { ...item, cantidad: item.cantidad - 1 };
          } else {
            // Si la cantidad era 1, lo devolvemos como null para luego filtrarlo
            return null;
          }
        }
        return item;
      })
      // Filtramos los null para removerlos del array
      .filter((item) => item !== null) as CarritoItem[];

    setItemsCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleEnviarCocina = () => {
    if (itemsCarrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }
    // Guardar historial
    localStorage.setItem("historialPedidos", JSON.stringify(itemsCarrito));

    // (Opcional) Si quieres vaciar el carrito al enviar a cocina, descomenta:
    // localStorage.removeItem("carrito");
    // setItemsCarrito([]);

    navigate("/confirmacion");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.backButton} onClick={handleVolver}>
          &lt; Atrás
        </span>
        <h1 style={styles.title}>Mi Orden</h1>
      </div>

      <div style={styles.content}>
        {loading && <p>Cargando carrito...</p>}

        {!loading && itemsCarrito.length === 0 && (
          <p style={styles.emptyText}>El carrito está vacío.</p>
        )}

        {!loading &&
          itemsCarrito.map((item) => (
            <div key={item.itemId} style={styles.itemCard}>
              <img
                src={
                  item.imagen
                    ? `http://localhost:3000/uploads/${item.imagen}`
                    : "http://localhost:3000/uploads/default.png"
                }
                alt={item.nombre}
                style={styles.itemImage}
                onError={(e) =>
                  (e.currentTarget.src =
                    "http://localhost:3000/uploads/default.png")
                }
              />
              <div style={styles.itemInfo}>
                <p style={styles.itemTitle}>{item.nombre}</p>
                <p style={styles.itemQuantity}>Cantidad: {item.cantidad}</p>
                <p style={styles.itemPrice}>${item.precio.toFixed(2)}</p>
              </div>
              <button
                style={styles.deleteButton}
                onClick={() => handleEliminar(item.itemId)}
              >
                Eliminar
              </button>
            </div>
          ))}
      </div>

      <div style={styles.buttonsContainer}>
        <button
          style={styles.enviarButton}
          onClick={handleEnviarCocina}
          disabled={itemsCarrito.length === 0}
        >
          Enviar a cocina
        </button>
        <button style={styles.seleccionButton} onClick={() => navigate("/menu")}>
          Ir a selección de productos
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "375px",
    margin: "0 auto",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  },
  backButton: {
    fontSize: "1rem",
    cursor: "pointer",
    color: "#333",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#e53935",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    gap: "10px",
    background: "#fff",
  },
  itemImage: {
    width: "80px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "4px",
    backgroundColor: "#f0f0f0",
  },
  itemInfo: {
    flex: 1,
    textAlign: "left",
  },
  itemTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  itemQuantity: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#555",
  },
  itemPrice: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "green",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  buttonsContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  enviarButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  seleccionButton: {
    backgroundColor: "white",
    color: "#4caf50",
    border: "2px solid #4caf50",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
