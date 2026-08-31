// Publica una oferta en tu canal de Telegram, sin usar la base de datos ni
// tocar el sitio. Simplemente te pregunta los datos del producto y lo manda
// con el formato de siempre. Gratis: la API de bots de Telegram no cobra
// nada (a diferencia de X).
//
// Setup, una sola vez:
//   1. Hablale a @BotFather en Telegram, mandale /newbot, seguí los pasos.
//      Te da un token (algo como "123456:ABC-DEF...").
//   2. Creá tu canal de Telegram (si no lo tenés) y agregá al bot como
//      administrador (para que pueda publicar ahí).
//   3. Conseguí el "chat id" del canal: si el canal es público, es
//      "@tu_canal" tal cual (con la arroba). Si es privado, hay que sacarlo
//      con la API (avisame si es tu caso, es un paso más).
//   4. Cargá en tu .env:
//        TELEGRAM_BOT_TOKEN=tu-token
//        TELEGRAM_CHAT_ID=@tu_canal
//
// Uso: node --env-file=.env scripts/publicar-telegram.js

import { createInterface } from 'node:readline/promises';

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
	console.error(
		'Faltan TELEGRAM_BOT_TOKEN y/o TELEGRAM_CHAT_ID en el .env (ver las instrucciones arriba del archivo).',
	);
	process.exit(1);
}

const rl = createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto) => rl.question(texto);

function armarMensaje({ nombre, precio, destacado, link }) {
	const precioFormateado = Number(precio).toLocaleString('es-AR');
	const lineaDestacado = destacado ? `\n${destacado}` : '';
	return `🔥 ${nombre}\n💰 $${precioFormateado}${lineaDestacado}\n\n👉 ${link}`;
}

async function publicar({ mensaje, imagen }) {
	const base = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

	if (imagen) {
		const respuesta = await fetch(`${base}/sendPhoto`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				photo: imagen,
				caption: mensaje,
			}),
		});
		return respuesta.json();
	}

	const respuesta = await fetch(`${base}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: TELEGRAM_CHAT_ID,
			text: mensaje,
		}),
	});
	return respuesta.json();
}

async function main() {
	console.log('Cargá los datos de la oferta (Enter para dejar vacío en los opcionales):\n');

	const nombre = await preguntar('Nombre del producto: ');
	const precio = await preguntar('Precio (solo números, ej. 45000): ');
	const destacado = await preguntar('Destacado, opcional (ej. "37% OFF"): ');
	const link = await preguntar('Link de afiliado: ');
	const imagen = await preguntar('URL de la imagen, opcional (Enter para publicar sin foto): ');

	rl.close();

	if (!nombre || !precio || !link) {
		console.error('\nNombre, precio y link son obligatorios. No se publicó nada.');
		process.exit(1);
	}

	const mensaje = armarMensaje({ nombre, precio, destacado, link });
	console.log('\n--- Vista previa ---\n');
	console.log(mensaje);
	console.log('\n--------------------\n');

	const resultado = await publicar({ mensaje, imagen: imagen || null });

	if (resultado.ok) {
		console.log('✅ Publicado en el canal.');
	} else {
		console.error('❌ Telegram devolvió un error:', JSON.stringify(resultado));
	}
}

main().catch((error) => {
	console.error('Error publicando en Telegram:', error);
	process.exit(1);
});
