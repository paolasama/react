import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface MenuItemDetail {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
}

interface OrdenItem {
  itemId: number;
  nombre: string;
  cantidad: number;
  instrucciones: string;
  precio: number;
  imagen?: string; // Se incluye la propiedad imagen
}

export default function DetalleItemScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<MenuItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [instrucciones, setInstrucciones] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/menu-items/${id}`);
        setItem(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading)
    return <p style={{ textAlign: "center", color: "gray" }}>Cargando detalle...</p>;
  if (error || !item)
    return <p style={{ textAlign: "center", color: "red" }}>Error al cargar el ítem</p>;

  const handleAgregarOrden = () => {
    // 1. Construimos el nuevo ítem de la orden
    const nuevaOrden: OrdenItem = {
      itemId: item.id,
      nombre: item.nombre,
      cantidad,
      instrucciones,
      precio: item.precio,
      imagen: item.imagen, // Se incluye la imagen
    };

    // 2. Leer el carrito desde localStorage
    const carritoActual = localStorage.getItem("carrito");

    // 3. Convertir a array (o array vacío si no es válido)
    let carritoParseado: OrdenItem[] = [];
    if (carritoActual) {
      try {
        const data = JSON.parse(carritoActual);
        if (Array.isArray(data)) {
          carritoParseado = data; // Si es array, lo usamos
        } else {
          // Si no es un array, forzamos a un array vacío
          carritoParseado = [];
        }
      } catch {
        // Eliminamos el parámetro error para no usarlo
        // y evitamos la advertencia "'error' is defined but never used"
        carritoParseado = [];
      }
    }

    // 4. Buscar si el producto ya existe en el carrito
    const indexExistente = carritoParseado.findIndex(
      (producto) => producto.itemId === item.id
    );
    if (indexExistente !== -1) {
      // Si existe, incrementamos la cantidad
      carritoParseado[indexExistente].cantidad += cantidad;
    } else {
      // Si no existe, lo agregamos
      carritoParseado.push(nuevaOrden);
    }

    // 5. Guardar carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoParseado));

    // 6. Mensaje de confirmación
    setMensaje(`Se agregó ${cantidad}x ${item.nombre} al pedido.`);

    // 7. Redirigir después de 2 segundos
    setTimeout(() => {
      setMensaje("");
      navigate("/exito"); // Redirige a la página de éxito
    }, 2000);
  };

  return (
    <div
      style={{ width: "100%", maxWidth: "500px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}
    >
      <div style={styles.header}>
        <span onClick={() => navigate(-1)} style={styles.backButton}>
          &lt; Atrás
        </span>
        <h1 style={styles.title}>Panamá</h1>
      </div>

      {item.imagen && (
        <img
          src={`http://localhost:3000/uploads/${item.imagen}`}
          alt={item.nombre}
          style={styles.image}
          onError={(e) =>
            (e.currentTarget.src = "http://localhost:3000/uploads/default.png")
          }
        />
      )}

      <div style={styles.content}>
        <h2>{item.nombre}</h2>
        <p>{item.descripcion}</p>
        <div>
          <span style={styles.price}>${item.precio.toFixed(2)}</span>
        </div>

        <textarea
          style={styles.textarea}
          placeholder="Instrucciones especiales"
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
        />

        <div style={styles.quantityContainer}>
          <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            style={styles.quantityButton}
          >
            -
          </button>
          <span style={styles.quantity}>{cantidad}</span>
          <button
            onClick={() => setCantidad(cantidad + 1)}
            style={styles.quantityButton}
          >
            +
          </button>
        </div>

        <button onClick={handleAgregarOrden} style={styles.addButton}>
          Agregar {cantidad} al pedido • ${(item.precio * cantidad).toFixed(2)}
        </button>

        {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#ffffff",
    padding: "10px 15px",
    borderBottom: "1px solid #ccc",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  backButton: {
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#333",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#a52a2a",
    margin: 0,
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  content: {
    padding: "20px",
  },
  price: {
    fontWeight: "bold",
    color: "green",
    fontSize: "18px",
  },
  textarea: {
    width: "100%",
    margin: "15px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  quantityButton: {
    backgroundColor: "#ddd",
    border: "none",
    padding: "8px 15px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
  },
  quantity: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  addButton: {
    width: "100%",
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  mensaje: {
    color: "green",
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
  },
};
