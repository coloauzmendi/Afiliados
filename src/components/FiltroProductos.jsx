import { useState } from "react";

export default function FiltroProductos({ productos }) {
  const [orden, setOrden] = useState("relevancia");

  const productosOrdenados = [...productos].sort((a, b) => {
    if (orden === "precio-asc") return a.precio - b.precio;
    if (orden === "precio-desc") return b.precio - a.precio;
    return 0;
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
          Ordenar por:
        </label>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {productosOrdenados.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {p.badge && (
                <span
                  style={{
                    background: "#fff8e6",
                    color: "#a35c00",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "3px",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {p.badge.toUpperCase()}
                </span>
              )}
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "normal",
                  margin: "0 0 0.5rem 0",
                  color: "#333",
                }}
              >
                {p.nombre}
              </h3>
              <p
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "600",
                  margin: "0 0 0.3rem 0",
                  color: "#000",
                }}
              >
                ${p.precio.toLocaleString("es-AR")}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#00a650", margin: 0 }}>
                Envío gratis
              </p>
            </div>
            <a
              href={p.link}
              target="_blank"
              rel="nofollow sponsored noopener"
              style={{
                marginTop: "1rem",
                display: "block",
                textAlign: "center",
                background: "#3483fa",
                color: "#fff",
                padding: "0.7rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Ver oferta
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
