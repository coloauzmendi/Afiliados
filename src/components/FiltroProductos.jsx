import { useEffect, useState } from "react";

function IconoSinImagen() {
  return (
    <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="15"
        rx="2"
        fill="none"
        stroke="#cfc7ac"
        strokeWidth="1.6"
      />
      <circle cx="8" cy="10" r="1.6" fill="#cfc7ac" />
      <path
        d="M4 17l5-5 3.5 3.5L16 11l4 4"
        fill="none"
        stroke="#cfc7ac"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatearPrecio(precio, moneda) {
  const prefijo = moneda === "USD" ? "US$" : "$";
  return `${prefijo}${precio.toLocaleString("es-AR")}`;
}

function mensajeCompartir(p, siteTitle) {
  const precio = formatearPrecio(p.precio, p.moneda);
  const destacado = p.badge ? ` (${p.badge})` : "";
  return `🔥 ${p.nombre} desde ${precio}${destacado} → mirá todas las opciones en ${siteTitle}`;
}

function BotonesCompartir({ producto, siteTitle }) {
  const [linkPagina, setLinkPagina] = useState("");

  useEffect(() => {
    setLinkPagina(window.location.href);
  }, []);

  if (!linkPagina) return null;

  const texto = mensajeCompartir(producto, siteTitle);
  const urlX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(linkPagina)}`;
  const urlWhatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${texto} ${linkPagina}`)}`;
  const urlTelegram = `https://t.me/share/url?url=${encodeURIComponent(linkPagina)}&text=${encodeURIComponent(texto)}`;

  return (
    <div className="compartir-fila">
      <span className="compartir-label">Compartir:</span>
      <a className="compartir-btn btn-x" href={urlX} target="_blank" rel="noopener noreferrer">
        X
      </a>
      <a
        className="compartir-btn btn-whatsapp"
        href={urlWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <a
        className="compartir-btn btn-telegram"
        href={urlTelegram}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
      </a>
    </div>
  );
}

export default function FiltroProductos({ productos, siteTitle }) {
  const [orden, setOrden] = useState("relevancia");
  const [panelActivo, setPanelActivo] = useState(false);

  useEffect(() => {
    try {
      setPanelActivo(localStorage.getItem("panelActivo") === "1");
    } catch {
      // localStorage no disponible (modo privado, etc.) — sin panel, no pasa nada.
    }
  }, []);

  const productosOrdenados = [...productos].sort((a, b) => {
    if (orden === "precio-asc") return a.precio - b.precio;
    if (orden === "precio-desc") return b.precio - a.precio;
    if (orden === "ofertas") return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
    return 0;
  });

  return (
    <div className="filtro-productos">
      <div className="filtro-barra">
        <label htmlFor="orden-productos">Ordenar por:</label>
        <select
          id="orden-productos"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="relevancia">Relevancia</option>
          <option value="ofertas">Con descuento primero</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="grilla-productos">
        {productosOrdenados.map((p) => (
          <div className="producto-card" key={p.id}>
            <div className="producto-imagen">
              {p.imagen ? (
                <img src={p.imagen} alt={p.nombre} loading="lazy" />
              ) : (
                <IconoSinImagen />
              )}
            </div>
            <div className="producto-info">
              <div className="producto-top">
                {p.plataforma && <span className="producto-plataforma">{p.plataforma}</span>}
                {p.badge && <span className="producto-badge">{p.badge}</span>}
              </div>
              <h3 className="producto-nombre">{p.nombre}</h3>
              <p className="producto-envio">Acceso inmediato</p>
            </div>
            <div className="producto-pie">
              <span className="producto-precio">{formatearPrecio(p.precio, p.moneda)}</span>
              <a
                className="producto-cta"
                href={p.link}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                Acceder
              </a>
            </div>
            {panelActivo && <BotonesCompartir producto={p} siteTitle={siteTitle} />}
          </div>
        ))}
      </div>

      <style>{`
        .filtro-productos {
          font-family: var(--font-body, sans-serif);
        }
        .filtro-barra {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
          font-size: 0.92rem;
        }
        .filtro-barra label {
          font-weight: 600;
          color: var(--navy-900);
        }
        .filtro-barra select {
          padding: 0.5rem 0.7rem;
          border-radius: var(--radius-md, 6px);
          border: 1px solid var(--paper-dim);
          background: var(--paper);
          color: var(--navy-900);
          font-family: inherit;
          font-size: 0.92rem;
        }
        .grilla-productos {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1.15rem;
        }
        .producto-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--paper-dim);
          border-radius: var(--radius-md, 6px);
          background: var(--paper);
          overflow: hidden;
          box-shadow: var(--box-shadow);
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .producto-card:hover {
          border-color: var(--brass);
          transform: translateY(-3px);
        }
        .producto-imagen {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 190px;
          background: #fff;
          border-bottom: 1px solid var(--paper-dim);
        }
        .producto-imagen img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1rem;
        }
        .producto-info {
          padding: 1.1rem 1.15rem 0.4rem;
          flex: 1;
        }
        .producto-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.55rem;
        }
        .producto-plataforma {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #857c63;
        }
        .producto-badge {
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          color: var(--brass);
        }
        .producto-nombre {
          font-size: 0.98rem;
          font-weight: 500;
          margin: 0 0 0.5rem 0;
          color: var(--navy-900);
          line-height: 1.35;
        }
        .producto-envio {
          font-size: 0.8rem;
          color: var(--software);
          margin: 0;
          font-weight: 600;
        }
        .producto-pie {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.15rem 1.1rem;
          margin-top: auto;
          border-top: 1px dashed #cfc7ac;
        }
        .producto-precio {
          font-family: var(--font-mono, monospace);
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--navy-900);
        }
        .producto-cta {
          display: inline-block;
          background: var(--navy-900);
          color: var(--sky);
          padding: 0.55rem 0.95rem;
          border-radius: var(--radius-sm, 4px);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.88rem;
          transition: background 0.15s ease;
        }
        .producto-cta:hover {
          background: var(--brass);
          color: var(--navy-900);
        }
        .compartir-fila {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.4rem;
          padding: 0 1.15rem 1.1rem;
        }
        .compartir-label {
          font-size: 0.75rem;
          color: #857c63;
          margin-right: 0.2rem;
        }
        .compartir-btn {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
        }
        .btn-x {
          background: #000;
        }
        .btn-whatsapp {
          background: #25d366;
        }
        .btn-telegram {
          background: #26a5e4;
        }
      `}</style>
    </div>
  );
}
