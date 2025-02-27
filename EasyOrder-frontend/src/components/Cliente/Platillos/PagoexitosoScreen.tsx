import React from "react";
import { useNavigate } from "react-router-dom";

const PagoexitosoScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleVolverMenu = () => {
    // Lógica para ir al menú principal o donde quieras
    navigate("/menu");
  };

  return (
    <div style={styles.container}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h1 style={styles.title}>Panamá</h1>
      </div>

      <div style={styles.content}>
        {/* Imagen de éxito */}
        <img
          src="http://localhost:3000/uploads/exito-pagado.png"
          alt="Pago Exitoso"
          style={styles.image}
          onError={(e) =>
            (e.currentTarget.src = "http://localhost:3000/uploads/default.png")
          }
        />

        <h2 style={styles.successTitle}>¡Pago Exitoso!</h2>
        <p style={styles.message}>
          Tu pago se ha procesado correctamente. ¡Gracias por tu compra!
        </p>

        <button style={styles.backButton} onClick={handleVolverMenu}>
          Volver al Menú
        </button>
      </div>
    </div>
  );
};

export default PagoexitosoScreen;

// Estilos en línea
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "375px",
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
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    marginBottom: "20px",
  },
  successTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "20px",
  },
  backButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
