# Digitalia

Sitio de afiliados hecho con [Astro](https://astro.build). Arma páginas estáticas de comparación de
productos digitales (cursos, plantillas, software y ebooks, vendidos en plataformas como Hotmart,
Envato, Udemy o Gumroad) organizadas por sector/subcategoría, leyendo el contenido de una base de
datos MySQL en el momento de compilar el sitio.

## Setup local

1. Instalar dependencias:

   ```sh
   npm install
   ```

2. Copiar `.env.example` a `.env` y completar con los datos de conexión de la base MySQL (Aiven u
   otro proveedor). `PUBLIC_GA_ID` es opcional: si se completa con el ID de medición de Google
   Analytics (`G-XXXXXXXXXX`), el sitio carga el script de analítica; si se deja vacío, no carga nada.

   ```sh
   cp .env.example .env
   ```

3. Si es la primera vez, crear las tablas y cargar los datos iniciales corriendo `db/schema.sql` y
   `db/seed.sql` contra esa base (por ejemplo desde MySQL Workbench). El `seed.sql` trae un catálogo
   de ejemplo (placeholders realistas, sin links reales) para que el sitio funcione desde el día uno.

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
  pertenece. Campos: `nombre`, `precio` (número entero, sin decimales), `moneda` (`ARS` o `USD`),
  `plataforma` (Hotmart, Envato Elements, Udemy, Gumroad, etc.), `link` (el de afiliado), `destacado`
  (texto corto tipo "Acceso de por vida") e `imagen` (URL directa a la portada/miniatura, opcional).

Para cargar productos reales, conectate a la base con MySQL Workbench (o el cliente que uses) y hacé
`UPDATE`/`INSERT` sobre `productos`, reemplazando los datos de ejemplo del `seed.sql` por tus
productos y links de afiliado reales (Hotmart, Envato, Udemy, Gumroad, según corresponda). El sitio
lee todo de nuevo cada vez que se vuelve a generar (`npm run build` / cada deploy) — no hace falta
tocar código para sumar o editar productos.

Para sumar una subcategoría nueva: un `INSERT` en `subcategorias` con un `slug` único (se usa en la
URL, ej. `cursos/mi-slug`) y sus productos correspondientes en `productos`. Si es un sector nuevo
(fuera de cursos/plantillas/software/ebooks), sumalo también en `SECTOR_LABELS`
(`src/lib/productos.ts`) y en el menú de `src/components/Header.astro`.

## Estructura

```text
├── db/
│   ├── schema.sql       # CREATE TABLE de subcategorias y productos
│   └── seed.sql         # Carga inicial de ejemplo (correr una sola vez)
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   │   ├── db.ts        # Conexión y consultas a MySQL
│   │   └── productos.ts # Helpers de formato (precio, fecha, labels de sector)
│   └── pages/
├── astro.config.mjs
└── package.json
```

## Comandos

| Comando           | Acción                                        |
| :----------------- | :--------------------------------------------- |
| `npm install`       | Instala dependencias                           |
| `npm run dev`       | Levanta el server de desarrollo en `localhost:4321` |
| `npm run build`     | Genera el sitio de producción en `./dist/`     |
| `npm run preview`   | Previsualiza el build de producción            |
