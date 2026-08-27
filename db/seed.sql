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
 CURDATE());

-- Productos de auriculares (datos reales)
INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, imagen, orden) VALUES
('auriculares', 'Jbl Tune 720bt - Auriculares Inalámbricos Color Negro', 108724, 'https://meli.la/12uXvkD', '45% DE DESCUENTO', 'https://http2.mlstatic.com/D_NQ_NP_2X_879868-MLA102084184934_122025-F.webp', 1),
('auriculares', 'Auriculares Jbl Quantum 100m2 Headset Negro Gamer', 89675, 'https://meli.la/2UJPVmm', 'Mismo precio en 3 cuotas', 'https://http2.mlstatic.com/D_NQ_NP_2X_964214-MLA99991757979_112025-F.webp', 2),
('auriculares', 'Buds Redmi Buds 6 Play', 99000, 'https://meli.la/2nmCYzQ', 'Mismo precio en 2 cuotas', 'https://http2.mlstatic.com/D_NQ_NP_2X_802305-MLA95679505222_102025-F.webp', 3),
('auriculares', 'Headset Gamer Redragon Alámbrico Hylas H260 Rgb', 48500, 'https://meli.la/2prEQPj', 'Llega gratis mañana', 'https://http2.mlstatic.com/D_NQ_NP_2X_747118-MLA99988691725_112025-F.webp', 4);

-- Productos de cargadores y accesorios (datos reales)
INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, imagen, orden) VALUES
('cargadores-y-accesorios', 'Cargador Rápido Usb-c Para Samsung 25w A54 A55 A56 A14 A15', 18919, 'https://meli.la/2uZACwf', '14% OFF', 'https://http2.mlstatic.com/D_NQ_NP_2X_854439-MLA107957494569_032026-F.webp', 1),
('cargadores-y-accesorios', 'Cargador Portátil generico 4500mAh compatible iPhone 12-16 20W Blanco', 33000, 'https://meli.la/2etLJPB', 'LLEGA GRATIS MAÑANA', 'https://http2.mlstatic.com/D_NQ_NP_2X_954253-MLA98975412759_112025-F.webp', 2),
('cargadores-y-accesorios', 'Cargador Apple 20W USB-C - Distribuidor Autorizado', 62999, 'https://meli.la/2a1V2RW', '37% OFF', 'https://http2.mlstatic.com/D_NQ_NP_2X_909488-MLA95706159082_102025-F.webp', 3),
('cargadores-y-accesorios', 'Cargador Ugreen 35w Usb-c Usb-a Carga Rápida Gan Plegable', 46342, 'https://meli.la/2ZVWgWv', '28% OFF', 'https://http2.mlstatic.com/D_NQ_NP_2X_618819-MLA103327976748_012026-F.webp', 4),
('cargadores-y-accesorios', 'Cargador 20w Carga Rapida + Cable Para Iphone 11 12 13 14', 23498, 'https://meli.la/2MCJBxw', '38% OFF', 'https://http2.mlstatic.com/D_NQ_NP_2X_777960-MLA90180200664_082025-F.webp', 5),
('cargadores-y-accesorios', 'Cargador Adaptador 35w Usb Tipo C Carga Super Rapida Power Delivery 240v Compatible iPhone Samsung Xiaomi Motorola Galaxy Tablet iPad Switch Hogar Oficina Viaje Premium Compacto Switch Liviano', 7954, 'https://meli.la/2pKJPYc', '7% OFF', 'https://http2.mlstatic.com/D_NQ_NP_2X_775134-MLA110461426814_052026-F.webp', 6);

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
