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

export default function DetalleItemScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<MenuItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Ejemplo de toggles / campos locales
  const [terminoCoccion, setTerminoCoccion] = useState(false);
  const [esparragos, setEsparragos] = useState(false);
  const [instrucciones, setInstrucciones] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/menu-items/${id}`)
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (error || !item) return <p>Error al cargar el ítem</p>;

  const handleAgregarOrden = () => {
    // Lógica para agregar el ítem a la orden
    navigate("/exito");
  };

  return (
    <div style={{ width: "375px", margin: "0 auto", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ height: "60px", display: "flex", alignItems: "center", borderBottom: "1px solid #ddd", padding: "0 1rem" }}>
        <span style={{ cursor: "pointer", marginRight: "auto" }} onClick={() => navigate(-1)}>
          ← Atrás
        </span>
        <h1 style={{ margin: "0 auto", color: "#e53935" }}>Panamá</h1>
      </div>

      <img
        src={`http://localhost:3000/uploads/${item.imagen}`}
        alt={item.nombre}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <div style={{ padding: "1rem" }}>
        <p style={{ color: "#aaa", margin: 0 }}>Especialidad de la Casa</p>
        <h2 style={{ margin: "0.2rem 0", color: "#333" }}>{item.nombre}</h2>
        <p style={{ color: "#666" }}>{item.descripcion}</p>

        <label style={{ display: "block", margin: "0.5rem 0" }}>
          Término de Cocción
          <input
            type="checkbox"
            checked={terminoCoccion}
            onChange={() => setTerminoCoccion(!terminoCoccion)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>

        <label style={{ display: "block", margin: "0.5rem 0" }}>
          Esparragos
          <input
            type="checkbox"
            checked={esparragos}
            onChange={() => setEsparragos(!esparragos)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>

        <textarea
          placeholder="Instrucciones especiales"
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
          style={{ width: "100%", minHeight: "60px", margin: "0.5rem 0", padding: "0.5rem" }}
        />

        <button
          onClick={handleAgregarOrden}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.8rem 1rem",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Agregar a mi orden
        </button>
      </div>
    </div>
  );
}