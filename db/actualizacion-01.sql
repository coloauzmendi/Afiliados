-- Actualización: imágenes de auriculares + productos reales de cargadores-y-accesorios.
-- Correr en Workbench conectado a Aiven, DESPUÉS de schema.sql y seed.sql.

-- Auriculares: sumar las imágenes reales a los 4 productos que ya estaban.
UPDATE productos SET imagen = 'https://http2.mlstatic.com/D_NQ_NP_2X_879868-MLA102084184934_122025-F.webp'
  WHERE subcategoria_slug = 'auriculares' AND nombre = 'Jbl Tune 720bt - Auriculares Inalámbricos Color Negro';

UPDATE productos SET imagen = 'https://http2.mlstatic.com/D_NQ_NP_2X_964214-MLA99991757979_112025-F.webp'
  WHERE subcategoria_slug = 'auriculares' AND nombre = 'Auriculares Jbl Quantum 100m2 Headset Negro Gamer';

UPDATE productos SET imagen = 'https://http2.mlstatic.com/D_NQ_NP_2X_802305-MLA95679505222_102025-F.webp'
  WHERE subcategoria_slug = 'auriculares' AND nombre = 'Buds Redmi Buds 6 Play';

UPDATE productos SET imagen = 'https://http2.mlstatic.com/D_NQ_NP_2X_747118-MLA99988691725_112025-F.webp'
  WHERE subcategoria_slug = 'auriculares' AND nombre = 'Headset Gamer Redragon Alámbrico Hylas H260 Rgb';

-- Cargadores y accesorios: sacar los 6 placeholders y cargar los productos reales.
DELETE FROM productos WHERE subcategoria_slug = 'cargadores-y-accesorios';

INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, imagen, orden) VALUES
('cargadores-y-accesorios', 'Cargador Rápido Usb-c Para Samsung 25w A54 A55 A56 A14 A15', 18919,
 'https://meli.la/2uZACwf', '14% OFF',
 'https://http2.mlstatic.com/D_NQ_NP_2X_854439-MLA107957494569_032026-F.webp', 1),

('cargadores-y-accesorios', 'Cargador Portátil generico 4500mAh compatible iPhone 12-16 20W Blanco', 33000,
 'https://meli.la/2etLJPB', 'LLEGA GRATIS MAÑANA',
 'https://http2.mlstatic.com/D_NQ_NP_2X_954253-MLA98975412759_112025-F.webp', 2),

('cargadores-y-accesorios', 'Cargador Apple 20W USB-C - Distribuidor Autorizado', 62999,
 'https://meli.la/2a1V2RW', '37% OFF',
 'https://http2.mlstatic.com/D_NQ_NP_2X_909488-MLA95706159082_102025-F.webp', 3),

('cargadores-y-accesorios', 'Cargador Ugreen 35w Usb-c Usb-a Carga Rápida Gan Plegable', 46342,
 'https://meli.la/2ZVWgWv', '28% OFF',
 'https://http2.mlstatic.com/D_NQ_NP_2X_618819-MLA103327976748_012026-F.webp', 4),

('cargadores-y-accesorios', 'Cargador 20w Carga Rapida + Cable Para Iphone 11 12 13 14', 23498,
 'https://meli.la/2MCJBxw', '38% OFF',
 'https://http2.mlstatic.com/D_NQ_NP_2X_777960-MLA90180200664_082025-F.webp', 5),

('cargadores-y-accesorios', 'Cargador Adaptador 35w Usb Tipo C Carga Super Rapida Power Delivery 240v Compatible iPhone Samsung Xiaomi Motorola Galaxy Tablet iPad Switch Hogar Oficina Viaje Premium Compacto Switch Liviano', 7954,
 'https://meli.la/2pKJPYc', '7% OFF',
 'https://http2.mlstatic.com/D_NQ_NP_2X_775134-MLA110461426814_052026-F.webp', 6);

-- Como ya tiene productos reales, la actualizamos a hoy para que aparezca como la más reciente.
UPDATE subcategorias SET fecha = CURDATE() WHERE slug = 'cargadores-y-accesorios';
