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
   otro proveedor). `PUBLIC_GA_ID` es opcional: si se completa con el ID de medición de Google
   Analytics (`G-XXXXXXXXXX`), el sitio carga el script de analítica; si se deja vacío, no carga nada.

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

Para cargar productos reales, conectate a la base con MySQL Workbench (o el cliente que uses) y hacé
`UPDATE`/`INSERT` sobre `productos`. El sitio lee todo de nuevo cada vez que se vuelve a generar
(`npm run build` / cada deploy) — no hace falta tocar código para sumar o editar productos.

Para sumar una subcategoría nueva: un `INSERT` en `subcategorias` con un `slug` único (se usa en la URL,
ej. `tecnologia/mi-slug`) y sus productos correspondientes en `productos`.

## Chequeo automático de precios

Los precios de Mercado Libre cambian seguido, así que `scripts/chequear-precios.js` los revisa solo
todos los días (vía GitHub Actions, ver `.github/workflows/chequear-precios.yml`): busca el ID de cada
producto siguiendo su link, consulta el precio actual en la API pública de Mercado Libre
(`api.mercadolibre.com`), y si cambió, actualiza la fila en la base. Si actualizó algo, además dispara
un redeploy en Vercel para que el precio nuevo salga publicado sin que nadie tenga que tocar nada.

Para que funcione hay que cargar, en el repo de GitHub → **Settings → Secrets and variables →
Actions**, estos secrets:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — los mismos datos que en tu `.env`.
- `VERCEL_DEPLOY_HOOK_URL` — un Deploy Hook de Vercel (Project Settings → Git → Deploy Hooks, creá uno
  para la rama de producción y copiá la URL que te da).

Se puede probar a mano en cualquier momento desde la pestaña **Actions** del repo → "Chequear precios"
→ **Run workflow**. En local, corre con:

```sh
node --env-file=.env scripts/chequear-precios.js
```

## Estructura

```text
├── .github/
│   └── workflows/
│       └── chequear-precios.yml  # Corre el chequeo de precios todos los días
├── db/
│   ├── schema.sql       # CREATE TABLE de subcategorias y productos
│   └── seed.sql         # Carga inicial (correr una sola vez)
├── public/
├── scripts/
│   └── chequear-precios.js  # Revisa precios en Mercado Libre y actualiza la base
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
| `npm run chequear-precios` | Corre a mano el chequeo de precios (necesita `.env`) |
