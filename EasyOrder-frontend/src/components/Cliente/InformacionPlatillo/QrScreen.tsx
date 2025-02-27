import React from "react";
import { useNavigate } from "react-router-dom";

const QrScreen: React.FC = () => {
  const navigate = useNavigate();

  // Cuando se hace clic en la imagen, redirige a DetalleItemScreen
  const handleClickQr = () => {
    navigate("/menu"); // Ajusta la ruta a tu DetalleItemScreen
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con fondo rojo */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>EasyOrder</h1>
      </div>

      {/* Texto de instrucción */}
      <h2 style={styles.instruction}>Escanea el QR de tu mesa</h2>

      {/* Imagen del QR con onClick */}
      <img
        src="http://localhost:3000/uploads/qr.png"
        alt="QR Code"
        style={styles.qrImage}
        onError={(e) => {
          e.currentTarget.src = "http://localhost:3000/uploads/default.png";
        }}
        onClick={handleClickQr} // Maneja el clic para navegar
      />

      {/* Enlace para reportar un problema */}
      <a href="/problema" style={styles.reportLink}>
        Reportar un problema
      </a>
    </div>
  );
};

export default QrScreen;

// Estilos en línea
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "375px", 
    margin: "0 auto",
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
    boxSizing: "border-box",
    textAlign: "center",
    position: "relative",
    paddingBottom: "20px",
  },
  header: {
    width: "100%",
    backgroundColor: "#f44336",
    padding: "10px 0",
    textAlign: "center",
  },
  headerTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#fff",
  },
  instruction: {
    fontSize: "20px",
    margin: "30px 0",
    color: "#333",
  },
  qrImage: {
    width: "50%",
    maxWidth: "250px",
    height: "auto",
    display: "block",
    margin: "0 auto 20px",
    cursor: "pointer",  // Para indicar que se puede hacer clic
  },
  reportLink: {
    color: "#f44336",
    fontSize: "16px",
    textDecoration: "none",
    display: "block",
    marginTop: "auto",
  },
};
