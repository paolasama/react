import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CategoriaObjeto {
  nombre: string;
  // si hay más propiedades, agrégalas aquí
}

interface ResultadoItem {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  // Aquí 'categoria' es un objeto con { nombre: string } o null/undefined
  categoria?: CategoriaObjeto | null;
}

export default function BuscarScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [historial, setHistorial] = useState(["Pizza", "Hamburguesa", "Sushi"]);
  const [resultados, setResultados] = useState<ResultadoItem[]>([]);
  const [todosPlatillos, setTodosPlatillos] = useState<ResultadoItem[]>([]);

  // Cargar los platillos al montar
  useEffect(() => {
    fetch("http://localhost:3000/api/menu-items")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data recibida:", data);
        // data es un array con objetos que tienen { categoria: { nombre: "Platillos" } }
        setTodosPlatillos(data);
      })
      .catch((error) => console.error("Error al obtener platillos:", error));
  }, []);

  // Filtrar por nombre o categoría
  const filtrarPlatillos = (texto: string) => {
    if (texto.length > 1) {
      const textoLower = texto.toLowerCase();
      const resultadosFiltrados = todosPlatillos.filter((item) => {
        // Ajuste: item.categoria?.nombre
        const catLower = String(item.categoria?.nombre ?? "").toLowerCase();
        return (
          item.nombre.toLowerCase().includes(textoLower) ||
          catLower.includes(textoLower)
        );
      });
      setResultados(resultadosFiltrados);
    } else {
      setResultados([]);
    }
  };

  // Manejar input de búsqueda
  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    filtrarPlatillos(value);
  };

  // Al hacer clic en un término del historial
  const handleClickHistorial = (termino: string) => {
    setQuery(termino);
    filtrarPlatillos(termino);
  };

  // Eliminar un término del historial
  const handleEliminarHistorial = (item: string) => {
    setHistorial(historial.filter((h) => h !== item));
  };

  // Navegar al detalle
  const handleClickResultado = (id: number) => {
    navigate(`/detalle/${id}`);
  };

  return (
    <div style={styles.screenContainer}>
      <div style={styles.topBar}>
        <button style={styles.cancelButton} onClick={() => navigate(-1)}>
          Cancelar
        </button>
        <h2 style={styles.topBarTitle}>Buscar Platillo</h2>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder='Buscar "Platillo" o "Categoría"...'
          value={query}
          onChange={handleBuscar}
        />
      </div>

      {query.length === 0 && (
        <div style={styles.historialContainer}>
          {historial.map((item, index) => (
            <div key={index} style={styles.historialRow}>
              <span style={styles.historialText} onClick={() => handleClickHistorial(item)}>
                {item}
              </span>
              <button
                style={styles.historialEliminar}
                onClick={() => handleEliminarHistorial(item)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {query.length > 0 && resultados.length === 0 && (
        <p style={styles.noResultados}>
          No se encontraron resultados para "{query}".
        </p>
      )}

      {query.length > 0 && resultados.length > 0 && (
        <div style={styles.resultadosContainer}>
          {resultados.map((item) => (
            <div
              key={item.id}
              style={styles.resultadoItem}
              onClick={() => handleClickResultado(item.id)}
            >
              <img
                src={`http://localhost:3000/uploads/${item.imagen}`}
                alt={item.nombre}
                style={styles.resultadoImagen}
                onError={(e) => {
                  e.currentTarget.src = "http://localhost:3000/uploads/default.png";
                }}
              />
              <div>
                {/* Mostrar la categoría como item.categoria?.nombre */}
                <p style={styles.resultadoCategoria}>
                  Etiqueta "{String(item.categoria?.nombre ?? "")}"
                </p>
                <p style={styles.resultadoNombre}>"{item.nombre}"</p>
                <p style={styles.resultadoDescripcion}>{item.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Estilos
const styles: { [key: string]: React.CSSProperties } = {
  screenContainer: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    position: "relative",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    height: "60px",
    borderBottom: "1px solid #ccc",
    position: "relative",
    padding: "0 10px",
  },
  topBarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: "18px",
    margin: 0,
    fontWeight: "bold",
  },
  cancelButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    color: "#007bff",
    cursor: "pointer",
  },
  searchContainer: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  historialContainer: {
    padding: "10px",
  },
  historialRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
  },
  historialText: {
    fontSize: "16px",
    color: "#333",
  },
  historialEliminar: {
    background: "none",
    border: "none",
    color: "#e53935",
    fontSize: "14px",
    cursor: "pointer",
  },
  noResultados: {
    padding: "20px",
    textAlign: "center",
    color: "#777",
  },
  resultadosContainer: {
    padding: "10px",
  },
  resultadoItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
  },
  resultadoImagen: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    objectFit: "cover",
    marginRight: "10px",
  },
  resultadoCategoria: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
    marginBottom: "2px",
  },
  resultadoNombre: {
    fontWeight: "bold",
    fontSize: "16px",
    margin: 0,
    marginBottom: "2px",
  },
  resultadoDescripcion: {
    fontSize: "14px",
    color: "#777",
    margin: 0,
  },
};
