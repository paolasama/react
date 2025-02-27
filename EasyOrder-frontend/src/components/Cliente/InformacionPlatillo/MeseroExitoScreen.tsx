import React from "react";
import { useNavigate } from "react-router-dom";

const MeseroExitoScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleRegresarMenu = () => {
    // Ajusta la ruta a donde quieras dirigir al usuario, por ejemplo "/menu"
    navigate("/menu");
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el título */}
      <div style={styles.header}>
        <h1 style={styles.title}>Panamá</h1>
      </div>

      <div style={styles.content}>
        <h2 style={styles.successTitle}>¡Un mesero está en camino a ayudarte!</h2>

        {/* Imagen de pulgar arriba (thumbs-up.png), ajusta la ruta si es necesario */}
        <img
          src="http://localhost:3000/uploads/exito-pagado.png"
          alt="Thumbs up"
          style={styles.image}
          onError={(e) => {
            e.currentTarget.src = "http://localhost:3000/uploads/default.png";
          }}
        />

        <button style={styles.backButton} onClick={handleRegresarMenu}>
          Regresar a menú principal
        </button>
      </div>
    </div>
  );
};

export default MeseroExitoScreen;

// Estilos en línea
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "375px", // Simulando el ancho de un móvil
    margin: "0 auto",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
    backgroundColor: "#fff",
    minHeight: "100vh",
    boxSizing: "border-box",
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  title: {
    color: "#e53935",
    margin: 0,
    fontSize: "24px",
  },
  content: {
    marginTop: "40px",
  },
  successTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: "20px",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    margin: "20px auto",
    display: "block",
  },
  backButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};
