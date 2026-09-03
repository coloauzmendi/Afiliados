# Digitalia

> **Plantilla de sitio de marketing de afiliados.** Este repo es un ejemplo completo y funcional (marca,
> catálogo y contenido reales de "Digitalia") pensado para clonarlo y adaptarlo a otro nicho o marca:
> cambiás `SITE_TITLE`/`SITE_DESCRIPTION` en `src/consts.ts`, cargás tu propio catálogo en la base
> (`db/seed.sql` como referencia) y reemplazás las páginas de contenido (`sobre.astro`, `privacidad.astro`)
> por las tuyas. El resto — esquema de MySQL, fichas de producto, comentarios de visitantes, deploy en
> Vercel — queda tal cual, listo para usar.

Sitio de afiliados hecho con [Astro](https://astro.build). Arma páginas de comparación de productos
digitales (cursos, plantillas, software y ebooks) organizadas por sector/subcategoría, leyendo el
contenido de una base de datos MySQL en el momento de compilar el sitio. La plataforma de cada
producto (Hotmart, Envato, Udemy, Gumroad o la que sea) es un campo de texto libre en la base — el
catálogo de ejemplo de este repo usa Hotmart y Envato Elements, pero no hay nada hardcodeado a esas
dos. Cada producto además tiene su propia ficha (foto, precio, reseña y
comentarios de visitantes) con el botón al link de afiliado real. Casi todo el sitio sigue siendo
estático (se genera en el build); lo único que corre en cada visita es el endpoint que guarda/lee los
comentarios (`/api/comentarios`), por eso el deploy usa el adaptador de Vercel en vez de un export
puramente estático.

## Setup local

1. Instalar dependencias:

   ```sh
   npm install
   ```

2. Copiar `.env.example` a `.env` y completar con los datos de conexión de la base MySQL (Aiven u
   otro proveedor). `PUBLIC_GA_ID` es opcional: si se completa con el ID de medición de Google
   Analytics (`G-XXXXXXXXXX`), el sitio carga el script de analítica; si se deja vacío, no carga nada.
   `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` también son opcionales — solo hacen falta si vas a usar
   `npm run publicar-telegram` (ver más abajo), no los usa el sitio en sí.

   ```sh
   cp .env.example .env
   ```

3. Si es la primera vez, crear las tablas y cargar los datos iniciales corriendo `db/schema.sql` y
   `db/seed.sql` contra esa base (por ejemplo desde MySQL Workbench). El `seed.sql` trae un catálogo
   de ejemplo (placeholders realistas, sin links reales) para que el sitio funcione desde el día uno.

   Si ya tenías una base cargada de antes (con `schema.sql` viejo, sin `slug`/`resena` en `productos`
   ni tabla `comentarios`), no vuelvas a correr `schema.sql` — corré `db/actualizacion-01.sql` una
   sola vez, que suma lo que falta sin borrar lo que ya cargaste.

4. Levantar el server de desarrollo:

   ```sh
   npm run dev
   ```

## Cómo cargar/editar productos

Los productos y las notas ("subcategorías") viven en dos tablas de MySQL:

- **`subcategorias`**: una fila por nota (ej. "marketing-digital", "notion-y-productividad"). Tiene
  el título, resumen, sector (`cursos`, `plantillas`, `software` o `ebooks`), fecha y el cuerpo en
  markdown (`contenido`).
- **`productos`**: una fila por producto, con `subcategoria_slug` apuntando a la nota a la que
  pertenece. Campos: `nombre`, `slug` (identifica su ficha propia, ej. `curso-marketing-digital-ventas-online`
  — único dentro de la subcategoría), `precio` (número entero, sin decimales), `moneda` (`ARS` o
  `USD`), `plataforma` (Hotmart, Envato Elements, Udemy, Gumroad, etc.), `link` (el de afiliado, se
  usa solo en el botón "Acceder" de la ficha del producto), `destacado` (texto corto tipo "Acceso de
  por vida"), `imagen` (URL directa a la portada/miniatura, opcional) y `resena` (texto en markdown
  con tu reseña del producto — se muestra en su ficha; si lo dejás vacío, la ficha muestra un aviso de
  "reseña pendiente" en su lugar).
- **`comentarios`**: los comentarios que deja la gente en la ficha de cada producto (nombre, texto y
  fecha). Se llenan solos desde el sitio — no hace falta cargar nada ahí a mano. Si algún día querés
  borrar uno (spam, offensive, etc.), es un `DELETE FROM comentarios WHERE id = ...`.

Para cargar productos reales, conectate a la base con MySQL Workbench (o el cliente que uses) y hacé
`UPDATE`/`INSERT` sobre `productos`, reemplazando los datos de ejemplo del `seed.sql` por tus
productos y links de afiliado reales (Hotmart, Envato, Udemy, Gumroad, según corresponda) — de paso
sumale un `slug` y tu `resena` en markdown a cada uno. El sitio lee todo de nuevo cada vez que se
vuelve a generar (`npm run build` / cada deploy) — no hace falta tocar código para sumar o editar
productos. Los comentarios sí son en vivo: se guardan y se muestran sin necesidad de redeployar.

Para sumar una subcategoría nueva: un `INSERT` en `subcategorias` con un `slug` único (se usa en la
URL, ej. `cursos/mi-slug`) y sus productos correspondientes en `productos`. Si es un sector nuevo
(fuera de cursos/plantillas/software/ebooks), sumalo también en `SECTOR_LABELS`
(`src/lib/productos.ts`) y en el menú de `src/components/Header.astro`.

## Estructura

```text
├── db/
│   ├── schema.sql          # CREATE TABLE de subcategorias, productos y comentarios
│   ├── seed.sql            # Carga inicial de ejemplo (correr una sola vez)
│   └── actualizacion-01.sql # Suma slug/resena/comentarios a una base ya existente
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Comentarios.jsx # Isla de React: lee/publica comentarios contra /api/comentarios
│   ├── layouts/
│   ├── lib/
│   │   ├── db.ts           # Conexión y consultas a MySQL
│   │   └── productos.ts    # Helpers de formato (precio, fecha, labels de sector)
│   └── pages/
│       ├── [sector]/[slug]/[producto].astro # Ficha individual de cada producto
│       └── api/comentarios.ts               # Único endpoint server-side (GET/POST comentarios)
├── scripts/
│   └── publicar-telegram.js # Publica una oferta en tu canal de Telegram desde la consola
├── publicar-telegram.html   # Lo mismo, pero como página HTML standalone (sin consola)
├── SOCIAL.md                 # Plantillas de texto para publicar en X y Telegram
├── astro.config.mjs
└── package.json
```

## Comentarios: cómo funciona por dentro

La ficha de cada producto (`/{sector}/{subcategoria}/{producto}`) es una página estática igual que el
resto — se genera en el build. Adentro tiene una isla de React (`Comentarios.jsx`, cargada con
`client:load`) que al abrir la página pide `GET /api/comentarios?productoId=...` para traer los
comentarios existentes, y al publicar uno nuevo manda `POST /api/comentarios` con `productoId`,
`nombre` y `comentario`. Ese endpoint es la única parte del sitio que corre en un server (función
serverless de Vercel) en cada visita — tiene `export const prerender = false` adentro para sacarlo del
build estático. El resto del sitio sigue con el `output: 'static'` de siempre (el default de Astro);
`astro.config.mjs` solo suma el adaptador `@astrojs/vercel`, que es lo que hace falta para que esa
única ruta pueda correr on-demand en Vercel. Tiene un campo honeypot básico contra bots, pero no hay
moderación automática: si algún comentario es spam u ofensivo, se borra a mano con un `DELETE` en la
tabla `comentarios` (ver arriba).

## Publicar en redes

Para avisar en Telegram cuando sumás un producto nuevo, sin necesidad de meterte a la base ni al
código, hay dos formas — las dos piden `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` (instrucciones de
cómo conseguirlos adentro de `scripts/publicar-telegram.js`):

- **Desde la consola**: `npm run publicar-telegram` (usa el `.env` local), te pregunta nombre, precio,
  destacado, link e imagen, y publica en el canal.
- **Sin consola**: abrí `publicar-telegram.html` directo en el navegador (es un archivo suelto, no hace
  falta levantar el sitio) — mismo formulario, pero pegás el token/chat id ahí una vez y quedan
  guardados en el navegador (`localStorage`) para la próxima.

`SOCIAL.md` tiene las plantillas de texto para copiar/pegar en X (Twitter), donde no hay API gratuita
como la de Telegram.

## Comandos

| Comando           | Acción                                        |
| :----------------- | :--------------------------------------------- |
| `npm install`       | Instala dependencias                           |
| `npm run dev`       | Levanta el server de desarrollo en `localhost:4321` |
| `npm run build`     | Genera el sitio de producción en `./dist/`     |
| `npm run publicar-telegram` | Publica una oferta en tu canal de Telegram desde la consola |
| `npm run preview`   | Previsualiza el build de producción            |
