import { useEffect, useState } from "react";

function formatearFecha(iso) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Comentarios({ productoId }) {
  const [comentarios, setComentarios] = useState(null); // null = todavía cargando
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [empresa, setEmpresa] = useState(""); // honeypot, siempre vacío para una persona
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelado = false;
    fetch(`/api/comentarios?productoId=${productoId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelado) setComentarios(data.comentarios ?? []);
      })
      .catch(() => {
        if (!cancelado) setComentarios([]);
      });
    return () => {
      cancelado = true;
    };
  }, [productoId]);

  async function enviar(e) {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !texto.trim()) {
      setError("Completá tu nombre y el comentario.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId, nombre, comentario: texto, empresa }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo publicar el comentario.");

      if (data.comentario) {
        setComentarios((prev) => [data.comentario, ...(prev ?? [])]);
      }
      setNombre("");
      setTexto("");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="comentarios" id="comentarios">
      <h2>¿Qué te pareció? Dejá tu comentario</h2>

      <form onSubmit={enviar} className="comentarios-form">
        {/* Honeypot: invisible para una persona, pero un bot que completa todos los campos cae acá. */}
        <input
          type="text"
          name="empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
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
        <button type="submit" disabled={enviando}>
          {enviando ? "Publicando..." : "Publicar comentario"}
        </button>
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
        .hp {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
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
        .comentarios-form button:hover:not(:disabled) {
          background: var(--brass);
          color: var(--navy-900);
        }
        .comentarios-form button:disabled {
          opacity: 0.6;
          cursor: default;
        }
        .comentarios-error {
          color: #b3261e;
          font-size: 0.85rem;
          margin: 0;
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
