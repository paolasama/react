import { useNavigate } from "react-router-dom";

const ConfirmacionScreen = () => {
  const navigate = useNavigate();

  const handleVolverMenu = () => {
    navigate("/menu");
  };

  return (
    <div style={styles.container}>
      {/* Barra superior con texto */}
      <p style={styles.topBar}>Orden en preparación</p>

      {/* Título grande */}
      <h1 style={styles.title}>
        ¡Tu <span style={styles.highlight}>orden</span> se está{" "}
        <span style={styles.highlight}>preparando</span>!
      </h1>

      {/* Imagen centrada */}
      <img
        src="http://localhost:3000/uploads/chef.png" // Asegúrate de que la ruta sea válida
        alt="Cocinero"
        style={styles.image}
        onError={(e) =>
          (e.currentTarget.src = "http://localhost:3000/uploads/default.png")
        }
      />

      {/* Botón principal */}
      <button style={styles.button} onClick={handleVolverMenu}>
        Regresar a menú principal
      </button>
    </div>
  );
};

export default ConfirmacionScreen;

// Estilos en línea
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    maxWidth: "375px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
    minHeight: "100vh", // para ocupar toda la pantalla
    backgroundColor: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },
  topBar: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "1rem",
    color: "#555",
    fontWeight: "bold",
  },
  title: {
    marginTop: "60px", // para dejar espacio a la barra superior
    fontSize: "1.5rem",
    color: "#000",
    lineHeight: "1.4",
    marginBottom: "20px",
  },
  highlight: {
    color: "#e53935", // Color rojo para destacar
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
    margin: "0 auto 20px",
    display: "block",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "14px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    maxWidth: "250px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
};
