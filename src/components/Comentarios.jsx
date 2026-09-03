import { useEffect, useState } from "react";

// Demo sin backend: los comentarios se guardan en localStorage, en el propio
// navegador de quien comenta — no hay servidor ni base de datos de por
// medio, así que no los ve nadie más que vos en esa misma compu/navegador.
// Es la forma más simple de mostrar la interacción sin depender de nada para
// correr la plantilla. Si querés comentarios compartidos de verdad entre
// visitantes, esto hay que reemplazarlo por un endpoint + base de datos real
// (ver la nota en el README).
const CLAVE_PREFIJO = "digitalia:comentarios:";

function leerComentarios(productoId) {
  try {
    const guardado = localStorage.getItem(`${CLAVE_PREFIJO}${productoId}`);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return []; // localStorage no disponible (modo privado, etc.)
  }
}

function guardarComentarios(productoId, comentarios) {
  try {
    localStorage.setItem(`${CLAVE_PREFIJO}${productoId}`, JSON.stringify(comentarios));
  } catch {
    // No se pudo guardar (localStorage lleno o no disponible) — no pasa nada, se pierde al recargar.
  }
}

function formatearFecha(iso) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Comentarios({ productoId }) {
  const [comentarios, setComentarios] = useState(null); // null = todavía no leyó localStorage
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setComentarios(leerComentarios(productoId));
  }, [productoId]);

  function enviar(e) {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !texto.trim()) {
      setError("Completá tu nombre y el comentario.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre: nombre.trim().slice(0, 80),
      comentario: texto.trim().slice(0, 1000),
      creadoEn: new Date().toISOString(),
    };
    const actualizados = [nuevo, ...(comentarios ?? [])];
    setComentarios(actualizados);
    guardarComentarios(productoId, actualizados);
    setNombre("");
    setTexto("");
  }

  return (
    <section className="comentarios" id="comentarios">
      <h2>¿Qué te pareció? Dejá tu comentario</h2>

      <form onSubmit={enviar} className="comentarios-form">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          maxLength={80}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Contanos tu experiencia con este producto..."
          value={texto}
          maxLength={1000}
          rows={3}
          onChange={(e) => setTexto(e.target.value)}
        />
        {error && <p className="comentarios-error">{error}</p>}
        <p className="comentarios-aviso">
          Demo sin backend: esto queda guardado solo en este navegador (no es público, no lo ven
          otros visitantes). Para comentarios compartidos de verdad hace falta un backend real — ver
          el README.
        </p>
        <button type="submit">Publicar comentario</button>
      </form>

      <div className="comentarios-lista">
        {comentarios === null && <p className="comentarios-vacio">Cargando comentarios...</p>}
        {comentarios !== null && comentarios.length === 0 && (
          <p className="comentarios-vacio">Todavía no hay comentarios. ¡Sé el primero!</p>
        )}
        {comentarios?.map((c) => (
          <article className="comentario" key={c.id}>
            <div className="comentario-cabecera">
              <strong>{c.nombre}</strong>
              <time>{formatearFecha(c.creadoEn)}</time>
            </div>
            <p>{c.comentario}</p>
          </article>
        ))}
      </div>

      <style>{`
        .comentarios {
          margin-top: 3em;
          padding-top: 2em;
          border-top: 1px solid var(--sky-line);
          font-family: var(--font-body, sans-serif);
        }
        .comentarios h2 {
          font-size: 1.25em;
          margin: 0 0 1em;
        }
        .comentarios-form {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          max-width: 480px;
          margin-bottom: 2em;
        }
        .comentarios-form input[type="text"],
        .comentarios-form textarea {
          padding: 0.65rem 0.8rem;
          border-radius: var(--radius-md, 6px);
          border: 1px solid var(--paper-dim);
          background: var(--paper);
          color: var(--navy-900);
          font-family: inherit;
          font-size: 0.92rem;
          resize: vertical;
        }
        .comentarios-form button {
          align-self: flex-start;
          background: var(--navy-900);
          color: var(--sky);
          border: none;
          padding: 0.6rem 1.1rem;
          border-radius: var(--radius-sm, 4px);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .comentarios-form button:hover {
          background: var(--brass);
          color: var(--navy-900);
        }
        .comentarios-error {
          color: #b3261e;
          font-size: 0.85rem;
          margin: 0;
        }
        .comentarios-aviso {
          font-size: 0.75rem;
          color: #857c63;
          margin: -0.2rem 0 0;
        }
        .comentarios-lista {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          max-width: 620px;
        }
        .comentarios-vacio {
          color: #857c63;
          font-size: 0.92rem;
        }
        .comentario {
          padding: 0.9rem 1rem;
          border: 1px solid var(--paper-dim);
          border-radius: var(--radius-md, 6px);
          background: var(--paper);
        }
        .comentario-cabecera {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.6rem;
          margin-bottom: 0.35rem;
        }
        .comentario-cabecera strong {
          color: var(--navy-900);
          font-size: 0.92rem;
        }
        .comentario-cabecera time {
          font-size: 0.75rem;
          color: #857c63;
        }
        .comentario p {
          margin: 0;
          font-size: 0.92rem;
          color: var(--slate);
          white-space: pre-wrap;
        }
      `}</style>
    </section>
  );
}
