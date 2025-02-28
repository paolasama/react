import React, { useState, useEffect } from "react";

// Interfaz que representa un ítem almacenado en tu DB o localStorage
interface ItemAlmacenado {
  itemId?: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria_id?: number;
  created_at?: string;
  updated_at?: string;
  completado?: boolean;
  instrucciones?: string;
  cantidad?: number;
}

// Interfaz para cada platillo dentro de una orden
interface Platillo {
  imagen: string;      // URL completa de la imagen
  nombre: string;
  descripcion: string; // Aquí puedes guardar precio u otra información
  completado?: boolean;
}

// Interfaz para la orden completa
interface Orden {
  id: number;
  platillos: Platillo[];
  estado: "pendiente" | "completado";
}

// Datos de ejemplo si no hay nada en localStorage o si ocurre un error
const datosDePrueba: Orden[] = [
  {
    id: 1,
    platillos: [
      {
        imagen: "http://localhost:3000/uploads/coca-cola.png",
        nombre: "Coca cola",
        descripcion: "Precio: $12",
      },
      {
        imagen: "http://localhost:3000/uploads/espaqueti-verde.png",
        nombre: "Espagueti verde",
        descripcion: "Precio: $70",
      },
    ],
    estado: "pendiente",
  },
];

const LadoCocinero: React.FC = () => {
  // Estado donde se almacenan TODAS las órdenes
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  // Estado para mostrar un mensaje de carga
  const [cargando, setCargando] = useState(true);

  // 1. Cargar desde localStorage al montar
  useEffect(() => {
    const cargarOrdenes = () => {
      const carritoLocal = localStorage.getItem("carrito");
      console.log("Contenido de localStorage:", carritoLocal);

      try {
        if (carritoLocal) {
          const itemsCargados = JSON.parse(carritoLocal);
          console.log("itemsCargados tras parsear:", itemsCargados);

          if (Array.isArray(itemsCargados)) {
            // Filtrar órdenes completas
            const ordenesFiltradas = itemsCargados.filter((item) => 'platillos' in item);
            // Filtrar elementos individuales
            const itemsIndividuales = itemsCargados.filter((item) => 'itemId' in item);

            if (ordenesFiltradas.length > 0) {
              setOrdenes(ordenesFiltradas);
            } else if (itemsIndividuales.length > 0) {
              // Crear una nueva orden con los items individuales
              const nuevaOrden: Orden = {
                id: 1,
                platillos: itemsIndividuales.map((item: ItemAlmacenado) => ({
                  imagen: item.imagen.startsWith("http")
                    ? item.imagen
                    : `http://localhost:3000/uploads/${item.imagen}`,
                  nombre: item.nombre,
                  descripcion: `Precio: $${item.precio}`,
                  completado: item.completado ?? false,
                })),
                estado: "pendiente",
              };
              setOrdenes([nuevaOrden]);
            } else {
              console.error("No hay datos válidos en localStorage.");
              setOrdenes(datosDePrueba);
            }
          } else {
            console.error("Los datos en localStorage no son un array.");
            setOrdenes(datosDePrueba);
          }
        } else {
          console.log("No hay carrito en localStorage, uso datosDePrueba");
          setOrdenes(datosDePrueba);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setOrdenes(datosDePrueba);
      } finally {
        setCargando(false);
      }
    };

    cargarOrdenes();
  }, []);

  // 2. Guardar siempre un array de órdenes en localStorage cuando cambie "ordenes"
  useEffect(() => {
    if (ordenes.length > 0) {
      console.log("Guardando en localStorage:", ordenes);
      localStorage.setItem("carrito", JSON.stringify(ordenes));
    }
  }, [ordenes]);

  // Definimos "ordenEnCurso" como la última orden pendiente
  const ordenEnCurso =
    [...ordenes].reverse().find((orden) => orden.estado === "pendiente") ||
    null;

  // Para togglear platillos, usamos la última orden (sin filtrar por estado) como referencia
  const orderMesasEnCurso =
    ordenes.length > 0 ? ordenes[ordenes.length - 1] : null;

  // Función para alternar el estado "completado" de un platillo en la orden en curso
  const togglePlatilloCompleto = (indexPlatillo: number) => {
    if (!orderMesasEnCurso) return;
    setOrdenes((ordenesPrevias) =>
      ordenesPrevias.map((orderMesas) =>
        orderMesas.id === orderMesasEnCurso.id
          ? {
              ...orderMesas,
              platillos: orderMesas.platillos.map((platillo, idx) =>
                idx === indexPlatillo
                  ? { ...platillo, completado: !platillo.completado }
                  : platillo
              ),
            }
          : orderMesas
      )
    );
  };

  // Marcar la orden en curso como "completado"
  const manejarOrdenLista = () => {
    if (ordenEnCurso) {
      alert(`¡Orden mesas ${ordenEnCurso.id} completada!`);
      setOrdenes((ordenesPrevias) =>
        ordenesPrevias.map((orden) =>
          orden.id === ordenEnCurso.id
            ? { ...orden, estado: "completado" }
            : orden
        )
      );
    }
  };

  const procesarItem = (item: ItemAlmacenado) => {
    // Lógica para procesar el item
    console.log(item.nombre);
  };

  // Ejemplo de uso de la función procesarItem para asegurar que ItemAlmacenado se utiliza
  useEffect(() => {
    const carritoLocal = localStorage.getItem("carrito");
    if (carritoLocal) {
      const itemsCargados: ItemAlmacenado[] = JSON.parse(carritoLocal);
      itemsCargados.forEach(item => procesarItem(item));
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Título principal */}
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "#B71C1C",
          textAlign: "center",
          margin: 0,
        }}
      >
        Panamá
      </h1>

      {/* Contenedor principal: Orden en curso a la izquierda y todas las órdenes a la derecha */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Columna izquierda: Orden en curso */}
        <div
          style={{
            flex: 1,
            border: "2px solid green",
            borderRadius: "8px",
            backgroundColor: "#E8F5E9",
            padding: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2E7D32",
              marginTop: 0,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Orden en curso
          </h2>

          {cargando && <p>Cargando órdenes...</p>}

          {ordenEnCurso && !cargando ? (
            <div>
              {ordenEnCurso.platillos.map((platillo, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    backgroundColor: "#FFFFFF",
                    padding: "8px",
                    borderRadius: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={platillo.imagen}
                      alt={platillo.nombre}
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                      // Fallback si falla la carga
                      onError={(e) =>
                        (e.currentTarget.src =
                          "http://localhost:3000/uploads/chef.png")
                      }
                    />
                    <div>
                      <p style={{ fontWeight: "bold", margin: 0 }}>
                        {platillo.nombre}
                      </p>
                      <p
                        style={{ fontSize: "14px", color: "gray", margin: 0 }}
                      >
                        {platillo.descripcion}
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={platillo.completado || false}
                    onChange={() => togglePlatilloCompleto(index)}
                  />
                </div>
              ))}
            </div>
          ) : !cargando ? (
            <p style={{ textAlign: "center", color: "#757575" }}>
              No hay orden en curso.
            </p>
          ) : null}
        </div>

        {/* Columna derecha: Todas las órdenes en un grid */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#B71C1C",
              textAlign: "center",
              margin: 0,
            }}
          >
            Órdenes
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {ordenes.map((orden) => (
              <div
                key={orden.id}
                style={{
                  border: "2px solid orange",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#FFF3E0",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    margin: "8px 0",
                  }}
                >
                  Orden Mesas {orden.id} - {orden.estado.toUpperCase()}
                </h3>
                <div>
                  {orden.platillos.map((platillo, idx) => (
                    <img
                      key={idx}
                      src={platillo.imagen}
                      alt={platillo.nombre}
                      style={{
                        width: "64px",
                        height: "64px",
                        margin: "4px",
                        borderRadius: "4px",
                        objectFit: "cover",
                      }}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "http://localhost:3000/uploads/chef.png")
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            style={{
              marginTop: "auto",
              padding: "12px",
              backgroundColor: "#00897B",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={manejarOrdenLista}
          >
            Orden Lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default LadoCocinero;
