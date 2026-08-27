-- Carga inicial: migra el contenido que ya estaba en los archivos .md.
-- Correr después de schema.sql, una sola vez.

INSERT INTO subcategorias (slug, title, sector, tipo, resumen, contenido, fecha) VALUES
('auriculares',
 'Los mejores auriculares en Mercado Libre Argentina',
 'tecnologia', 'fisico',
 'Comparamos los auriculares más vendidos y mejor valorados en Mercado Libre Argentina, con opciones para cada presupuesto.',
 '## Cable o inalámbricos\n\nCon cable son más baratos a igual calidad y no dependés de batería — la mejor opción si jugás competitivo. Los inalámbricos suman comodidad para el día a día, pero cuestan un poco más.',
 '2026-08-25'),

('relojes-inteligentes',
 'Los mejores relojes inteligentes en Mercado Libre Argentina',
 'tecnologia', 'fisico',
 'Comparamos los relojes inteligentes más vendidos y mejor valorados en Mercado Libre Argentina, con opciones para cada presupuesto.',
 '## Qué mirar antes de comprar\n\n[Completar: 2-3 líneas sobre qué tener en cuenta al elegir — autonomía, compatibilidad con el celular, resistencia al agua, etc.]',
 '2026-08-20'),

('celulares',
 'Los mejores celulares en Mercado Libre Argentina',
 'tecnologia', 'fisico',
 'Comparamos los celulares más vendidos y mejor valorados en Mercado Libre Argentina, con opciones para cada presupuesto.',
 '## Qué mirar antes de comprar\n\n[Completar: 2-3 líneas sobre qué tener en cuenta al elegir — batería, cámara, almacenamiento, etc.]',
 '2026-08-20'),

('cargadores-y-accesorios',
 'Los mejores cargadores y accesorios en Mercado Libre Argentina',
 'tecnologia', 'fisico',
 'Comparamos cargadores, cables y accesorios más vendidos y mejor valorados en Mercado Libre Argentina, con opciones para cada presupuesto.',
 '## Qué mirar antes de comprar\n\n[Completar: 2-3 líneas sobre qué tener en cuenta al elegir — potencia de carga, compatibilidad, largo del cable, etc.]',
 '2026-08-20');

-- Productos de auriculares (datos reales)
INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, orden) VALUES
('auriculares', 'Jbl Tune 720bt - Auriculares Inalámbricos Color Negro', 108724, 'https://meli.la/12uXvkD', '45% DE DESCUENTO', 1),
('auriculares', 'Auriculares Jbl Quantum 100m2 Headset Negro Gamer', 89675, 'https://meli.la/2UJPVmm', 'Mismo precio en 3 cuotas', 2),
('auriculares', 'Buds Redmi Buds 6 Play', 99000, 'https://meli.la/2nmCYzQ', 'Mismo precio en 2 cuotas', 3),
('auriculares', 'Headset Gamer Redragon Alámbrico Hylas H260 Rgb', 48500, 'https://meli.la/2prEQPj', 'Llega gratis mañana', 4);

-- Placeholders para relojes-inteligentes (completar con productos reales)
INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, orden) VALUES
('relojes-inteligentes', 'Nombre del producto 1', 0, 'https://meli.la/PEGAR-LINK-1', 'Completar destacado', 1),
('relojes-inteligentes', 'Nombre del producto 2', 0, 'https://meli.la/PEGAR-LINK-2', 'Completar destacado', 2),
('relojes-inteligentes', 'Nombre del producto 3', 0, 'https://meli.la/PEGAR-LINK-3', 'Completar destacado', 3),
('relojes-inteligentes', 'Nombre del producto 4', 0, 'https://meli.la/PEGAR-LINK-4', 'Completar destacado', 4),
('relojes-inteligentes', 'Nombre del producto 5', 0, 'https://meli.la/PEGAR-LINK-5', 'Completar destacado', 5),
('relojes-inteligentes', 'Nombre del producto 6', 0, 'https://meli.la/PEGAR-LINK-6', 'Completar destacado', 6);

-- Placeholders para celulares (completar con productos reales)
INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, orden) VALUES
('celulares', 'Nombre del producto 1', 0, 'https://meli.la/PEGAR-LINK-1', 'Completar destacado', 1),
('celulares', 'Nombre del producto 2', 0, 'https://meli.la/PEGAR-LINK-2', 'Completar destacado', 2),
('celulares', 'Nombre del producto 3', 0, 'https://meli.la/PEGAR-LINK-3', 'Completar destacado', 3),
('celulares', 'Nombre del producto 4', 0, 'https://meli.la/PEGAR-LINK-4', 'Completar destacado', 4),
('celulares', 'Nombre del producto 5', 0, 'https://meli.la/PEGAR-LINK-5', 'Completar destacado', 5),
('celulares', 'Nombre del producto 6', 0, 'https://meli.la/PEGAR-LINK-6', 'Completar destacado', 6);

-- Placeholders para cargadores-y-accesorios (completar con productos reales)
INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, orden) VALUES
('cargadores-y-accesorios', 'Nombre del producto 1', 0, 'https://meli.la/PEGAR-LINK-1', 'Completar destacado', 1),
('cargadores-y-accesorios', 'Nombre del producto 2', 0, 'https://meli.la/PEGAR-LINK-2', 'Completar destacado', 2),
('cargadores-y-accesorios', 'Nombre del producto 3', 0, 'https://meli.la/PEGAR-LINK-3', 'Completar destacado', 3),
('cargadores-y-accesorios', 'Nombre del producto 4', 0, 'https://meli.la/PEGAR-LINK-4', 'Completar destacado', 4),
('cargadores-y-accesorios', 'Nombre del producto 5', 0, 'https://meli.la/PEGAR-LINK-5', 'Completar destacado', 5),
('cargadores-y-accesorios', 'Nombre del producto 6', 0, 'https://meli.la/PEGAR-LINK-6', 'Completar destacado', 6);
