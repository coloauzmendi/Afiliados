-- Esquema de la base de datos de Ahorrando.
-- Correr esto una sola vez en Workbench (conectado a la base de Aiven) para crear las tablas.

CREATE TABLE IF NOT EXISTS subcategorias (
  slug         VARCHAR(100) NOT NULL PRIMARY KEY,   -- identifica la ruta: /{sector}/{slug}
  title        VARCHAR(255) NOT NULL,
  sector       VARCHAR(50)  NOT NULL,               -- tecnologia, finanzas, saas-ia, fisicos
  tipo         VARCHAR(20)  NOT NULL,                -- fisico, saas, digital, ia
  resumen      TEXT         NOT NULL,
  contenido    TEXT NULL,                            -- cuerpo en markdown (la sección "Qué mirar antes de comprar")
  fecha        DATE         NOT NULL,
  creado_en    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sector (sector)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS productos (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  subcategoria_slug  VARCHAR(100) NOT NULL,
  nombre             VARCHAR(255) NOT NULL,
  precio             INT          NOT NULL,          -- en pesos argentinos, sin decimales (ej: 45000)
  link               VARCHAR(500) NOT NULL,           -- link de afiliado (meli.la/...)
  destacado          VARCHAR(255) NULL,               -- ej: "25% OFF", "Envío gratis"
  imagen             VARCHAR(500) NULL,               -- URL directa a la foto del producto
  orden              INT          NOT NULL DEFAULT 0, -- para forzar un orden manual (menor = primero)
  creado_en          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subcategoria_slug) REFERENCES subcategorias(slug)
    ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_subcategoria (subcategoria_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
