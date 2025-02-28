import React from "react";

const MapaDeMesas: React.FC = () => {
  return (
    <div
      style={{
        width: "400px",
        height: "650px",
        border: "1px solid #ccc",
        position: "relative",
        margin: "0 auto",
        fontFamily: "sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Encabezado */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "8px 16px",
          borderBottom: "1px solid #ccc",
          position: "relative",
        }}
      >
        {/* Ícono de usuario (emoji) */}
        <span style={{ fontSize: "24px" }}>👤</span>
        
        {/* Título principal */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "20px", color: "#B71C1C" }}>Panamá</h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>Mapa de mesas</p>
        </div>

        {/* Campana de notificaciones (emoji) */}
        <div style={{ position: "relative", fontSize: "24px" }}>
          <span>🔔</span>
          {/* Círculo rojo de notificación */}
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              backgroundColor: "red",
              color: "#fff",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            2
          </span>
        </div>
      </header>

      {/* Contenedor principal para las mesas */}
      <div style={{ position: "relative", width: "100%", height: "100%", padding: "10px" }}>
        {/* Ejemplo de mesas con posiciones y formas distintas */}

        {/* Mesa 1 (círculo pequeño) */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>MESA 1</span>
        </div>

        {/* Mesa 2 (rectángulo) */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "110px",
            width: "80px",
            height: "40px",
            backgroundColor: "#fff",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>MESA 2</span>
        </div>

        {/* Mesa 3 (rectángulo) */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "210px",
            width: "80px",
            height: "40px",
            backgroundColor: "#fff",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>MESA 3</span>
        </div>

        {/* Mesa 4 (rectángulo grande) */}
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "20px",
            width: "170px",
            height: "70px",
            backgroundColor: "#00a",
            color: "#fff",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>MESA 4</span>
        </div>

        {/* Mesa 5 (rectángulo grande) */}
        <div
          style={{
            position: "absolute",
            top: "210px",
            left: "20px",
            width: "100px",
            height: "120px",
            backgroundColor: "#fff",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          MESA 5
        </div>

        {/* Mesa 6 (círculo grande) */}
        <div
          style={{
            position: "absolute",
            top: "220px",
            left: "140px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#00a",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          MESA 6
        </div>

        {/* Mesa 7 (cuadrado pequeño) */}
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "220px",
            width: "60px",
            height: "60px",
            backgroundColor: "#fff",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          MESA 7
        </div>

        {/* Mesa 9 (cuadrado pequeño) */}
        <div
          style={{
            position: "absolute",
            top: "350px",
            left: "270px",
            width: "60px",
            height: "60px",
            backgroundColor: "#fff",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          MESA 9
        </div>
      </div>

      {/* Barra de navegación (parte inferior) */}
      <nav
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "60px",
          backgroundColor: "#fff",
          borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* Opción Mesas */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>🪑</span>
          <span style={{ fontSize: "12px" }}>Mesas</span>
        </div>

        {/* Opción Pedidos */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>🛒</span>
          <span style={{ fontSize: "12px" }}>Pedidos</span>
        </div>

        {/* Opción Pagos */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>💰</span>
          <span style={{ fontSize: "12px" }}>Pagos</span>
        </div>

        {/* Opción Mensajes */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>✉️</span>
          <span style={{ fontSize: "12px" }}>Mensajes</span>
        </div>
      </nav>
    </div>
  );
};

export default MapaDeMesas;
