// Única ruta on-demand del sitio (el resto se genera en el build): lee y
// guarda los comentarios de la ficha de cada producto. `prerender = false`
// es lo que la saca del build estático; necesita el adaptador de Vercel
// configurado en astro.config.mjs para poder correr server-side.
import type { APIRoute } from 'astro';
import { crearComentario, getComentarios } from '../../lib/db';

export const prerender = false;

const NOMBRE_MAX = 80;
const COMENTARIO_MAX = 1000;

export const GET: APIRoute = async ({ url }) => {
	const productoId = Number(url.searchParams.get('productoId'));
	if (!productoId || !Number.isInteger(productoId)) {
		return new Response(JSON.stringify({ error: 'Falta productoId.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const comentarios = await getComentarios(productoId);
		return new Response(JSON.stringify({ comentarios }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error al leer comentarios:', error);
		return new Response(JSON.stringify({ error: 'No se pudieron cargar los comentarios.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

export const POST: APIRoute = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Pedido inválido.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const { productoId, nombre, comentario, empresa } = (body ?? {}) as Record<string, unknown>;

	// Honeypot: campo oculto que un usuario real nunca completa. Si viene con
	// algo, tratamos el pedido como bot y devolvemos éxito falso sin guardar
	// nada (así el bot no aprende que fue detectado).
	if (typeof empresa === 'string' && empresa.trim() !== '') {
		return new Response(JSON.stringify({ ok: true }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const productoIdNum = Number(productoId);
	const nombreLimpio = typeof nombre === 'string' ? nombre.trim().slice(0, NOMBRE_MAX) : '';
	const comentarioLimpio =
		typeof comentario === 'string' ? comentario.trim().slice(0, COMENTARIO_MAX) : '';

	if (!productoIdNum || !Number.isInteger(productoIdNum)) {
		return new Response(JSON.stringify({ error: 'Falta productoId.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
	if (!nombreLimpio || !comentarioLimpio) {
		return new Response(JSON.stringify({ error: 'Completá tu nombre y el comentario.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const nuevo = await crearComentario(productoIdNum, nombreLimpio, comentarioLimpio);
		return new Response(JSON.stringify({ comentario: nuevo }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		// El producto ya no existe (se borró de la base, o el id no era válido):
		// la foreign key lo rechaza. Mensaje aparte para que no se confunda con
		// un error real del servidor.
		if ((error as { code?: string }).code === 'ER_NO_REFERENCED_ROW_2') {
			return new Response(JSON.stringify({ error: 'Este producto ya no existe.' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			});
		}
		console.error('Error al guardar comentario:', error);
		return new Response(JSON.stringify({ error: 'No se pudo publicar el comentario.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
