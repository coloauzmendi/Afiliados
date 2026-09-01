-- Migración 01: fichas individuales de producto + comentarios de visitantes.
-- Para bases que ya tenían el esquema de schema.sql cargado (no lo vuelve a
-- crear de cero, así no se pierde nada de lo que ya cargaste). Correr una
-- sola vez, con MySQL Workbench conectado a tu base de Aiven.

-- Fuerza la conexión a UTF-8: el paso de más abajo compara letras con tilde
-- (á, é, í...) byte a byte, así que si el cliente conecta con otro charset
-- por defecto esas comparaciones no matchean y los slugs generados quedan
-- con guiones de más en vez de la vocal sin tilde.
SET NAMES utf8mb4;

ALTER TABLE productos
  ADD COLUMN slug   VARCHAR(150) NULL AFTER nombre,
  ADD COLUMN resena TEXT         NULL AFTER destacado;

-- Genera un slug provisorio a partir del nombre para las filas que ya
-- existen (sacando tildes/ñ y reemplazando lo que no sea letra/número por
-- guiones). Si dos productos de la misma subcategoría quedan con el mismo
-- slug, editalos a mano después — el paso siguiente lo va a rechazar con un
-- error de clave duplicada si pasa.
UPDATE productos
SET slug = TRIM(BOTH '-' FROM
  REGEXP_REPLACE(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(LOWER(nombre),
      'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u'), 'ñ', 'n'),
    '[^a-z0-9]+', '-'
  )
)
WHERE slug IS NULL;

ALTER TABLE productos
  MODIFY COLUMN slug VARCHAR(150) NOT NULL,
  ADD UNIQUE KEY uniq_subcategoria_slug (subcategoria_slug, slug);

CREATE TABLE IF NOT EXISTS comentarios (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  producto_id  INT          NOT NULL,
  nombre       VARCHAR(80)  NOT NULL,
  comentario   VARCHAR(1000) NOT NULL,
  creado_en    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_producto (producto_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
