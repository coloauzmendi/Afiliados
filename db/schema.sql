-- Esquema de la base de datos de Digitalia.
-- Arranque de cero: esto borra las tablas viejas (del sitio anterior, de tecnología
-- física de Mercado Libre) y las recrea para el catálogo de productos digitales.
-- Correr esto una sola vez en Workbench (conectado a la base de Aiven) para
-- (re)crear las tablas.

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
  precio             INT          NOT NULL,          -- sin decimales (ej: 24999 ARS, o 49 USD)
  moneda             VARCHAR(3)   NOT NULL DEFAULT 'ARS', -- 'ARS' o 'USD'
  plataforma         VARCHAR(50)  NOT NULL,           -- Hotmart, Envato Elements, Udemy, Gumroad, etc.
  link               VARCHAR(500) NOT NULL,           -- link de afiliado
  destacado          VARCHAR(255) NULL,               -- ej: "25% OFF", "Acceso de por vida"
  imagen             VARCHAR(500) NULL,               -- URL directa a la portada/miniatura
  orden              INT          NOT NULL DEFAULT 0, -- para forzar un orden manual (menor = primero)
  creado_en          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subcategoria_slug) REFERENCES subcategorias(slug)
    ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_subcategoria (subcategoria_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
