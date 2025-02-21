// MenuClienteScreen.tsx
import React from "react";

/** Ejemplo de URLs de imágenes (simulan platillos). 
 *  Reemplázalas con las tuyas o usa un fetch a tu API.
 */
const mockImages = [
  "https://via.placeholder.com/200?text=Platillo+1",
  "https://via.placeholder.com/200?text=Platillo+2",
  "https://via.placeholder.com/200?text=Platillo+3",
  "https://via.placeholder.com/200?text=Platillo+4",
  "https://via.placeholder.com/200?text=Platillo+5",
  "https://via.placeholder.com/200?text=Platillo+6",
  "https://via.placeholder.com/200?text=Platillo+7",
  "https://via.placeholder.com/200?text=Platillo+8",
  "https://via.placeholder.com/200?text=Platillo+9",
  "https://via.placeholder.com/200?text=Platillo+10",
  "https://via.placeholder.com/200?text=Platillo+11",
  "https://via.placeholder.com/200?text=Platillo+12",
];

/** Objeto de estilos en JavaScript/TypeScript */
const styles = {
  phoneContainer: {
    width: "375px",
    height: "812px",
    margin: "2rem auto",
    border: "1px solid #ccc",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    background: "#f9f9f9",
    fontFamily: "Poppins, sans-serif",
    position: "relative" as const,
  },
  topBar: {
    height: "60px",
    background: "#fff",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    boxSizing: "border-box" as const,
  },
  leftIcons: {
    display: "flex",
    gap: "1rem",
  },
  rightIcons: {
    display: "flex",
    gap: "1rem",
  },
  icon: {
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  title: {
    fontSize: "1.5rem",
    margin: 0,
    color: "#e53935",
  },
  imageGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2px",
    background: "#eee",
    overflowY: "auto" as const,
  },
  imageStyle: {
    width: "100%",
    height: "120px",
    objectFit: "cover" as const,
    cursor: "pointer",
  },
  bottomNav: {
    height: "60px",
    background: "#fff",
    borderTop: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    textAlign: "center" as const,
    fontSize: "0.9rem",
    color: "#555",
    cursor: "pointer",
    padding: "0.5rem 0",
  },
  navItemHover: {
    background: "#f0f0f0",
  },
};

const MenuClienteScreen: React.FC = () => {
  return (
    <div style={styles.phoneContainer}>
      {/* Barra superior */}
      <div style={styles.topBar}>
        <div style={styles.leftIcons}>
          <span style={styles.icon}>🏠</span>
          <span style={styles.icon}>🔔</span>
        </div>
        <h1 style={styles.title}>Panamá</h1>
        <div style={styles.rightIcons}>
          <span style={styles.icon}>🛒</span>
        </div>
      </div>

      {/* Grid de imágenes */}
      <div style={styles.imageGrid}>
        {mockImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Platillo ${index + 1}`}
            style={styles.imageStyle}
          />
        ))}
      </div>

      {/* Barra de navegación inferior */}
      <div style={styles.bottomNav}>
        <div style={styles.navItem}>Menú</div>
        <div style={styles.navItem}>Buscar</div>
        <div style={styles.navItem}>Enviar pedido</div>
        <div style={styles.navItem}>Ayuda</div>
        <div style={styles.navItem}>Pagar</div>
      </div>
    </div>
  );
};

export default MenuClienteScreen;
