# Digitalia

> **Plantilla de sitio de marketing de afiliados.** Es un ejemplo completo y funcional (marca,
> catálogo y contenido reales de "Digitalia"), 100% código — sin base de datos, sin `.env`, sin
> servicios externos que configurar. Cloná el repo, `npm install && npm run dev`, y ya está andando
> con el catálogo de ejemplo. Para adaptarlo a otro nicho o marca: cambiás `SITE_TITLE`/
> `SITE_DESCRIPTION` en `src/consts.ts`, tu catálogo en `src/lib/catalogo.ts`, y las páginas de
> contenido (`sobre.astro`, `privacidad.astro`) por las tuyas.

Sitio de afiliados hecho con [Astro](https://astro.build). Arma páginas de comparación de productos
digitales (cursos, plantillas, software y ebooks) organizadas por sector/subcategoría. Todo el
catálogo (subcategorías y productos) vive hardcodeado en `src/lib/catalogo.ts` — no hay base de
datos ni backend de ningún tipo, así que el sitio entero se genera 100% estático y se puede
desplegar en cualquier hosting estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages, lo que
sea). La plataforma de cada producto (Hotmart, Envato, Udemy, Gumroad o la que sea) es un campo de
texto libre — el catálogo de ejemplo usa Hotmart y Envato Elements, pero no hay nada hardcodeado a
esas dos. Cada producto además tiene su propia ficha (foto, precio, reseña y un espacio para
comentarios) con el botón al link de afiliado real.

## Setup local

```sh
npm install
npm run dev
```

Y ya — abrís `http://localhost:4321` y ves el sitio con el catálogo de ejemplo, sin tocar nada más.

No hace falta ningún `.env` para esto. Si querés Google Analytics o el script de publicar en
Telegram (ver más abajo), ahí sí hace falta uno — copiá `.env.example` a `.env` y completá lo que
uses; los dos son opcionales y no afectan al resto del sitio.

## Cómo cargar/editar tu propio catálogo

Todo el catálogo está en un solo archivo: `src/lib/catalogo.ts`. Dos arrays:

- **`SUBCATEGORIAS`**: una entrada por nota (ej. "marketing-digital", "notion-y-productividad").
  Cada una tiene `slug` (se usa en la URL), `title`, `sector` (`cursos`, `plantillas`, `software` o
  `ebooks`), `resumen`, `fecha` y el cuerpo en markdown (`contenido`).
- **`PRODUCTOS`**: una entrada por producto, con `subcategoriaSlug` apuntando a la nota a la que
  pertenece. Campos: `id` (número único), `nombre`, `slug` (identifica su ficha propia dentro de la
  subcategoría, ej. `curso-marketing-digital-ventas-online`), `precio` (número entero, sin
  decimales), `moneda` (`ARS` o `USD`), `plataforma`, `link` (el de afiliado, se usa solo en el
  botón "Acceder" de la ficha del producto), `destacado` (texto corto tipo "Acceso de por vida",
  opcional), `imagen` (URL directa a la portada/miniatura, opcional) y `resena` (texto en markdown
  con tu reseña del producto, opcional — si lo dejás en `null`, la ficha muestra un aviso de "reseña
  pendiente" en su lugar).

Para cargar tu catálogo real: editá esos dos arrays con tus productos y links de afiliado
verdaderos. Es un archivo de código como cualquier otro — se edita, se guarda, y con `npm run dev`
o `npm run build` el sitio ya lo refleja, sin nada más que hacer.

Para sumar una subcategoría nueva: un objeto más en `SUBCATEGORIAS` con un `slug` único y sus
productos correspondientes en `PRODUCTOS`. Si es un sector nuevo (fuera de
cursos/plantillas/software/ebooks), sumalo también en `SECTOR_LABELS` (`src/lib/productos.ts`) y en
el menú de `src/components/Header.astro`.

**¿Y si quiero un backend de verdad** (para poder sumar productos sin tocar código ni redeployar, o
para que los comentarios de visitantes se compartan entre todos en vez de quedar solo en el
navegador de cada uno)? `src/lib/catalogo.ts` expone 4 funciones async
(`getSubcategorias`, `getTodosLosProductos`, `getProductosPorSlug`, `getSubcategoriasConDesde`) — es
la única "API" que usan las páginas. Reimplementarlas contra MySQL, Postgres, una API externa, lo
que sea, y devolviendo estos mismos tipos, alcanza para no tener que tocar ninguna página del sitio.
Para los comentarios sería agregar de nuevo un endpoint server-side (esto necesita `output: 'server'`
+ un adaptador, ver [la doc de Astro](https://docs.astro.build/en/guides/on-demand-rendering/)) y
cambiar `Comentarios.jsx` para que pegue contra ese endpoint en vez de `localStorage`.

## Estructura

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Comentarios.jsx # Isla de React: comentarios guardados en localStorage (ver abajo)
│   ├── layouts/
│   ├── lib/
│   │   ├── catalogo.ts     # Todo el catálogo de ejemplo, hardcodeado acá
│   │   └── productos.ts    # Helpers de formato (precio, fecha, labels de sector)
│   └── pages/
│       └── [sector]/[slug]/[producto].astro # Ficha individual de cada producto
├── scripts/
│   └── publicar-telegram.js # Publica una oferta en tu canal de Telegram desde la consola
├── publicar-telegram.html   # Lo mismo, pero como página HTML standalone (sin consola)
├── SOCIAL.md                 # Plantillas de texto para publicar en X y Telegram
├── astro.config.mjs
└── package.json
```

## Comentarios: cómo funciona por dentro

La ficha de cada producto (`/{sector}/{subcategoria}/{producto}`) tiene, al pie, una isla de React
(`Comentarios.jsx`, cargada con `client:load`) donde cualquiera puede escribir su opinión. Como el
sitio es 100% estático y no hay backend, los comentarios se guardan en `localStorage` — es decir,
en el navegador de quien comenta, nada más: no se comparten entre visitantes, ni nosotros ni nadie
más los ve. Es una forma de mostrar la interacción sin depender de nada para correr la plantilla.
Si querés comentarios compartidos de verdad, hace falta un backend real — ver la sección de arriba.

## Publicar en redes

Para avisar en Telegram cuando sumás un producto nuevo, sin necesidad de tocar el código, hay dos
formas — las dos piden `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` en tu `.env` (instrucciones de cómo
conseguirlos adentro de `scripts/publicar-telegram.js`):

- **Desde la consola**: `npm run publicar-telegram`, te pregunta nombre, precio, destacado, link e
  imagen, y publica en el canal.
- **Sin consola**: abrí `publicar-telegram.html` directo en el navegador (es un archivo suelto, no
  hace falta levantar el sitio) — mismo formulario, pero pegás el token/chat id ahí una vez y
  quedan guardados en el navegador (`localStorage`) para la próxima.

`SOCIAL.md` tiene las plantillas de texto para copiar/pegar en X (Twitter), donde no hay API
gratuita como la de Telegram.

## Comandos

| Comando                     | Acción                                                       |
| :--------------------------- | :------------------------------------------------------------ |
| `npm install`                | Instala dependencias                                           |
| `npm run dev`                 | Levanta el server de desarrollo en `localhost:4321`            |
| `npm run build`               | Genera el sitio estático en `./dist/`                          |
| `npm run preview`             | Previsualiza el build de producción                            |
| `npm run publicar-telegram`   | Publica una oferta en tu canal de Telegram desde la consola    |
