import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CarritoItem {
  itemId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

const PagoScreen: React.FC = () => {
  const navigate = useNavigate();

  // Estado para los ítems del carrito (desde localStorage)
  const [itemsPago, setItemsPago] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para método de pago
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  // Estado para la propina
  const [propina, setPropina] = useState(50);
  // Estado para un mensaje temporal
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarCarrito = () => {
      try {
        const carritoGuardado = localStorage.getItem("carrito");
        const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
        // Filtra solo los items válidos
        const itemsValidos = carrito.filter(
          (item: CarritoItem) => item.itemId && item.nombre && item.precio
        );
        setItemsPago(itemsValidos);
      } catch (error) {
        console.error("Error al leer carrito desde localStorage:", error);
        setItemsPago([]);
      } finally {
        setLoading(false);
      }
    };
    cargarCarrito();
  }, []);

  // Eliminar un ítem del carrito
  const handleEliminar = (id: number) => {
    const nuevoCarrito = itemsPago.filter((item) => item.itemId !== id);
    setItemsPago(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Calcular subtotal: sumando precio * cantidad
  const subtotal = itemsPago.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  // Total = subtotal + propina
  const total = subtotal + propina;

  // Cambiar método de pago
  const handleMetodoPago = () => {
    const nuevoMetodo = metodoPago === "Efectivo" ? "Tarjeta" : "Efectivo";
    setMetodoPago(nuevoMetodo);
  };

  // Acción de pagar: muestra un mensaje por 3 segundos y luego limpia el carrito y redirige
  const handlePagar = () => {
    if (itemsPago.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }
    setMensaje("Procesando pago...");
    setTimeout(() => {
      setMensaje("");
      // Borrar el carrito
      localStorage.removeItem("carrito");
      setItemsPago([]);
      navigate("/pago-exitoso");
    }, 3000);
  };

  return (
    <div style={styles.container}>
      {/* Encabezado */}
      <div style={styles.header}>
        <span style={styles.backButton} onClick={() => navigate(-1)}>
          &lt; Atrás
        </span>
        <h1 style={styles.title}>Pago</h1>
      </div>

      {/* Mensaje temporal */}
      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}

      <div style={styles.content}>
        {loading && <p>Cargando carrito...</p>}

        {!loading && itemsPago.length === 0 && (
          <p style={styles.emptyText}>El carrito está vacío.</p>
        )}

        {!loading &&
          itemsPago.map((item) => (
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
                  (e.currentTarget.src = "http://localhost:3000/uploads/default.png")
                }
              />
              <div style={styles.itemInfo}>
                <p style={styles.itemTitle}>{item.nombre}</p>
                <p style={styles.itemQuantity}>Cantidad: {item.cantidad}</p>
                <p style={styles.itemPrice}>
                  ${(item.precio * item.cantidad).toFixed(2)}
                </p>
              </div>
              <button style={styles.deleteButton} onClick={() => handleEliminar(item.itemId)}>
                Eliminar
              </button>
            </div>
          ))}
      </div>

      {/* Sección de método de pago y propina */}
      <div style={styles.paymentSection}>
        <div style={styles.paymentRow}>
          <span style={styles.paymentLabel}>Método: {metodoPago}</span>
          <button style={styles.paymentButton} onClick={handleMetodoPago}>
            Cambiar
          </button>
        </div>
        <div style={styles.paymentRow}>
          <span style={styles.paymentLabel}>Propina</span>
          <div>
            <button style={styles.paymentButton} onClick={() => setPropina(propina + 10)}>
              +$10
            </button>
            <button
              style={styles.paymentButton}
              onClick={() => setPropina(Math.max(0, propina - 10))}
            >
              -$10
            </button>
          </div>
          <span style={styles.paymentLabel}>${propina}</span>
        </div>
      </div>

      {/* Total y botón pagar */}
      <div style={styles.totalContainer}>
        <p style={styles.totalLabel}>
          Total: <span style={styles.totalAmount}>${total.toFixed(2)}</span>
        </p>
        <button style={styles.payButton} onClick={handlePagar} disabled={itemsPago.length === 0}>
          Pagar Ahora
        </button>
      </div>
    </div>
  );
};

export default PagoScreen;

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
  mensaje: {
    fontSize: "1rem",
    color: "green",
    margin: "10px 0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
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
  paymentSection: {
    marginTop: "20px",
    textAlign: "left",
  },
  paymentRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  paymentLabel: {
    fontSize: "16px",
    color: "#333",
  },
  paymentButton: {
    backgroundColor: "#fff",
    color: "#007bff",
    border: "1px solid #007bff",
    borderRadius: "8px",
    padding: "5px 10px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  totalContainer: {
    marginTop: "20px",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  totalAmount: {
    color: "#e53935",
  },
  payButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
