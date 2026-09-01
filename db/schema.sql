-- Esquema de la base de datos de Digitalia.
-- Arranque de cero: esto borra las tablas viejas (del sitio anterior, de tecnología
-- física de Mercado Libre) y las recrea para el catálogo de productos digitales.
-- Correr esto una sola vez en Workbench (conectado a la base de Aiven) para
-- (re)crear las tablas.

DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS subcategorias;

CREATE TABLE subcategorias (
  slug         VARCHAR(100) NOT NULL PRIMARY KEY,   -- identifica la ruta: /{sector}/{slug}
  title        VARCHAR(255) NOT NULL,
  sector       VARCHAR(50)  NOT NULL,               -- cursos, plantillas, software, ebooks
  resumen      TEXT         NOT NULL,
  contenido    TEXT NULL,                            -- cuerpo en markdown (la sección "Qué mirar antes de comprar")
  fecha        DATE         NOT NULL,
  creado_en    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sector (sector)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE productos (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  subcategoria_slug  VARCHAR(100) NOT NULL,
  nombre             VARCHAR(255) NOT NULL,
  slug               VARCHAR(150) NOT NULL,           -- identifica la ruta de la ficha: /{sector}/{subcategoria}/{slug}
  precio             INT          NOT NULL,          -- sin decimales (ej: 24999 ARS, o 49 USD)
  moneda             VARCHAR(3)   NOT NULL DEFAULT 'ARS', -- 'ARS' o 'USD'
  plataforma         VARCHAR(50)  NOT NULL,           -- Hotmart, Envato Elements, Udemy, Gumroad, etc.
  link               VARCHAR(500) NOT NULL,           -- link de afiliado (solo se usa en el botón "Acceder" de la ficha)
  destacado          VARCHAR(255) NULL,               -- ej: "25% OFF", "Acceso de por vida"
  imagen             VARCHAR(500) NULL,               -- URL directa a la portada/miniatura
  resena             TEXT         NULL,                -- reseña propia del producto (markdown), se muestra en su ficha
  orden              INT          NOT NULL DEFAULT 0, -- para forzar un orden manual (menor = primero)
  creado_en          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subcategoria_slug) REFERENCES subcategorias(slug)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uniq_subcategoria_slug (subcategoria_slug, slug),
  INDEX idx_subcategoria (subcategoria_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Comentarios de visitantes en la ficha de cada producto.
CREATE TABLE comentarios (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  producto_id  INT          NOT NULL,
  nombre       VARCHAR(80)  NOT NULL,
  comentario   VARCHAR(1000) NOT NULL,
  creado_en    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_producto (producto_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
