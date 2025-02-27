import React from "react";
import { useNavigate } from "react-router-dom";

const AyudaScreen: React.FC = () => {
  const navigate = useNavigate();

  // Cambia el alert por navigate("/mesero-exito")
  const handleLlamarMesero = () => {
    // Redirige a la pantalla de éxito de mesero
    navigate("/meseroexito");
  };

  const handleCancelar = () => {
    // Vuelve a la pantalla anterior
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Panamá</h1>
      </div>

      <h2 style={styles.subtitle}>Solicitar Ayuda</h2>

      <img
        src="http://localhost:3000/uploads/mesero.png"
        alt="Icono de mesero"
        style={styles.image}
        onError={(e) =>
          (e.currentTarget.src = "http://localhost:3000/uploads/default.png")
        }
      />

      <div style={styles.buttonsContainer}>
        <button style={styles.callButton} onClick={handleLlamarMesero}>
          Llamar mesero
        </button>
        <button style={styles.cancelButton} onClick={handleCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AyudaScreen;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "375px",
    margin: "0 auto",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    minHeight: "100vh",
    boxSizing: "border-box",
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
  subtitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "20px 0",
    color: "#333",
  },
  image: {
    width: "50%",
    height: "auto",
    objectFit: "cover",
    margin: "20px auto",
    display: "block",
  },
  buttonsContainer: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  callButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: "#4caf50",
    border: "2px solid #4caf50",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
