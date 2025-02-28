import React from "react";

const Notificaciones: React.FC = () => {
  return (
    <div
      style={{
        width: "400px",
        height: "650px",
        margin: "0 auto",
        border: "1px solid #ccc",
        position: "relative",
        fontFamily: "sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Encabezado */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ccc",
          padding: "8px 16px",
          position: "relative",
        }}
      >
        {/* Botón "Volver a Mesas" (flecha + texto) */}
        <button
          style={{
            border: "none",
            background: "none",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          // onClick={() => { /* lógica para volver a Mesas */ }}
        >
          <span style={{ fontSize: "18px" }}>←</span>
          <span>Mesas</span>
        </button>

        {/* Título principal en el centro */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "20px",
              color: "#B71C1C",
              lineHeight: "1.2",
            }}
          >
            Panamá
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
            Notificaciones
          </p>
        </div>

        {/* Campana de notificaciones (emoji) con badge rojo */}
        <div style={{ position: "relative", fontSize: "20px" }}>
          <span>🔔</span>
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

      {/* Contenido principal (lista de notificaciones) */}
      <main
        style={{
          padding: "16px",
          overflowY: "auto",
          height: "calc(100% - 120px)", // Ajusta según la altura de header y nav
        }}
      >
        {/* Notificación 1 */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "12px",
          }}
        >
          {/* Encabezado de la notificación: nombre de la mesa */}
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            MESA 9
          </h2>

          {/* Contenido: imagen + texto + estado */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <img
              src="https://via.placeholder.com/60"
              alt="Platillo"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <p style={{ margin: 0, fontSize: "14px" }}>...2 +</p>

            {/* Estado de la orden */}
            <div
              style={{
                marginLeft: "auto",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#2E7D32",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>ORDEN LISTA</span>
              <span style={{ fontSize: "18px" }}>✔</span>
            </div>
          </div>
        </div>

        {/* Notificación 2 */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "12px",
          }}
        >
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            MESA 1
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <img
              src="https://via.placeholder.com/60"
              alt="Platillo"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <p style={{ margin: 0, fontSize: "14px" }}>...2 +</p>

            {/* Texto de “Servicios” con ícono de cubiertos */}
            <div
              style={{
                marginLeft: "auto",
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>SERVICIOS</span>
              <span style={{ fontSize: "18px" }}>🍴</span>
            </div>
          </div>
        </div>

        {/* Botones de acción generales */}
        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          <button
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Agregar producto
          </button>
          <button
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#F44336",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Orden servida
          </button>
        </div>
      </main>

      {/* Barra de navegación inferior */}
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>🪑</span>
          <span style={{ fontSize: "12px" }}>Mesas</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>🛒</span>
          <span style={{ fontSize: "12px" }}>Pedidos</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>💰</span>
          <span style={{ fontSize: "12px" }}>Pagos</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "24px" }}>✉️</span>
          <span style={{ fontSize: "12px" }}>Mensajes</span>
        </div>
      </nav>
    </div>
  );
};

export default Notificaciones;
