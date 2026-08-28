# Ahorrando

Sitio de afiliados hecho con [Astro](https://astro.build). Arma páginas estáticas de comparación de
productos (Mercado Libre, por ahora) organizadas por sector/subcategoría, leyendo el contenido de una
base de datos MySQL en el momento de compilar el sitio.

## Setup local

1. Instalar dependencias:

   ```sh
   npm install
   ```

2. Copiar `.env.example` a `.env` y completar con los datos de conexión de la base MySQL (Aiven u
   otro proveedor):

   ```sh
   cp .env.example .env
   ```

3. Si es la primera vez, crear las tablas y cargar los datos iniciales corriendo `db/schema.sql` y
   `db/seed.sql` contra esa base (por ejemplo desde MySQL Workbench).

4. Levantar el server de desarrollo:

   ```sh
   npm run dev
   ```

## Cómo cargar/editar productos

Los productos y las notas ("subcategorías") viven en dos tablas de MySQL:

- **`subcategorias`**: una fila por nota (ej. "auriculares", "celulares"). Tiene el título, resumen,
  sector, fecha y el cuerpo en markdown (`contenido`).
- **`productos`**: una fila por producto, con `subcategoria_slug` apuntando a la nota a la que
  pertenece. Campos: `nombre`, `precio` (número entero en pesos), `link` (el de afiliado), `destacado`
  (texto corto tipo "25% OFF") e `imagen` (URL directa a la foto, opcional).

**Forma rápida (recomendada)**: `npm run agregar-producto`. Te pide el link de afiliado (el que sacás
con "Compartir" en el panel de afiliados de Mercado Libre) y busca solo el nombre, precio e imagen del
producto con la API pública de Mercado Libre — vos solo confirmás y elegís la subcategoría y el
destacado. Ver `scripts/agregar-producto.js`.

**Forma manual**: conectate a la base con MySQL Workbench (o el cliente que uses) y hacé `UPDATE`/`INSERT`
sobre `productos` directamente.

Cualquiera de las dos formas: el sitio lee todo de nuevo cada vez que se vuelve a generar
(`npm run build` / cada deploy) — no hace falta tocar código para sumar o editar productos.

Para sumar una subcategoría nueva (por ahora solo por SQL, no tiene forma rápida todavía): un `INSERT`
en `subcategorias` con un `slug` único (se usa en la URL, ej. `tecnologia/mi-slug`) y sus productos
correspondientes en `productos`.

## Estructura

```text
├── db/
│   ├── schema.sql       # CREATE TABLE de subcategorias y productos
│   └── seed.sql         # Carga inicial (correr una sola vez)
├── scripts/
│   └── agregar-producto.js  # Carga rápida de productos por consola
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
| `npm run agregar-producto` | Carga un producto nuevo por consola, con autocompletado desde Mercado Libre |
