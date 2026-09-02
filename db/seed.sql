-- Carga inicial de Digitalia: catálogo de ejemplo (productos placeholder,
-- realistas pero no reales) para tener el sitio funcionando desde el día uno.
-- Todo el catálogo usa Hotmart y Envato Elements, que son las plataformas de
-- afiliados en las que ya está aprobada la cuenta real (Udemy y Gumroad
-- quedan afuera por ahora — se suman cuando se aprueben esas cuentas).
-- Reemplazá nombre/precio/link/imagen de cada producto por el real cuando
-- tengas los links de afiliado. La columna `resena` queda vacía a propósito:
-- es el texto que vos vas a escribir para la ficha de cada producto (se
-- muestra en /{sector}/{subcategoria}/{slug}).
-- Correr después de schema.sql, una sola vez.

INSERT INTO subcategorias (slug, title, sector, resumen, contenido, fecha) VALUES
('marketing-digital',
 'Los mejores cursos de marketing digital y ventas online',
 'cursos',
 'Comparamos los cursos de marketing digital y ventas online mejor valorados, para arrancar a vender sin perder tiempo en teoría de más.',
 '## Qué mirar antes de comprar\n\n- **Acceso de por vida o por tiempo limitado**: en Hotmart la mayoría es de por vida, pero conviene chequearlo en la página de venta antes de pagar.\n- **Certificado**: si te sirve para tu CV o LinkedIn, fijate que lo incluya sin costo extra.\n- **Actualizaciones**: marketing digital cambia rápido — un curso de 2022 sin actualizar puede tener herramientas que ya no existen.',
 '2026-08-20'),

('programacion-y-tech',
 'Los mejores cursos de programación y tecnología',
 'cursos',
 'Comparamos los cursos de programación y tecnología mejor valorados en Hotmart, para todos los niveles.',
 '## Qué mirar antes de comprar\n\n- **Nivel real**: leé la descripción completa, no solo el título — "desde cero" a veces asume que ya sabés programar.\n- **Proyectos prácticos**: un curso con proyectos reales para armar portfolio vale mucho más que uno solo teórico.\n- **Actualizado a versiones actuales**: un curso de hace 3 años puede enseñar una versión de lenguaje o framework que ya cambió — fijate la fecha de la última actualización.',
 '2026-08-22'),

('notion-y-productividad',
 'Las mejores plantillas de Notion para organizarte',
 'plantillas',
 'Comparamos las plantillas de Notion más vendidas para organizar tu vida, tus proyectos o tu negocio sin armar todo desde cero.',
 '## Qué mirar antes de comprar\n\n- **Compatibilidad**: algunas plantillas están pensadas para Notion gratis y otras necesitan el plan pago — fijate antes de comprar.\n- **Tutorial incluido**: una plantilla compleja sin video explicativo te puede llevar horas entender.\n- **Actualizaciones**: buscá vendedores que sigan actualizando la plantilla, no algo abandonado hace dos años.',
 '2026-08-18'),

('presentaciones-y-canva',
 'Las mejores plantillas de presentaciones y Canva',
 'plantillas',
 'Comparamos los packs de plantillas de presentaciones y Canva más vendidos, para armar algo profesional sin depender de un diseñador.',
 '## Qué mirar antes de comprar\n\n- **Formato**: chequeá si es editable en Canva, PowerPoint, Google Slides o los tres — no todos los packs sirven en todas las herramientas.\n- **Licencia de uso**: para uso comercial (venderle a un cliente) algunas plantillas piden una licencia extendida.\n- **Cantidad real de slides únicos**: "100 slides" a veces son variaciones de los mismos 10 diseños.',
 '2026-08-15'),

('ia-y-automatizacion',
 'Las mejores herramientas de IA y automatización',
 'software',
 'Comparamos kits, plantillas y licencias de herramientas de IA y automatización para ahorrar horas de trabajo repetitivo.',
 '## Qué mirar antes de comprar\n\n- **Necesitás una cuenta de otra plataforma**: muchos kits de IA funcionan sobre ChatGPT, Make o Zapier — confirmá que ya tenés (o vas a pagar) esa cuenta.\n- **Licencia de por vida vs. suscripción**: algunas herramientas cobran una vez, otras mensual — leé bien qué estás pagando.\n- **Soporte de instalación**: si no sos técnico, priorizá los que incluyen guía o setup asistido.',
 '2026-08-24'),

('plugins-wordpress',
 'Los mejores plugins y temas para WordPress',
 'software',
 'Comparamos los plugins y temas premium de WordPress más vendidos en Envato, para no reinventar la rueda en cada proyecto.',
 '## Qué mirar antes de comprar\n\n- **Compatibilidad de versión**: fijate la última fecha de actualización del plugin contra la versión de WordPress que usás.\n- **Meses de soporte incluidos**: en Envato suele venir con 6 meses de soporte — después es opcional y pago.\n- **Reseñas de compradores reales**: en Envato las calificaciones y comentarios son bastante confiables para detectar plugins con bugs.',
 '2026-08-19'),

('finanzas-personales',
 'Los mejores ebooks de finanzas personales e inversión',
 'ebooks',
 'Comparamos los ebooks de finanzas personales e inversión mejor valorados, pensados para el contexto argentino.',
 '## Qué mirar antes de comprar\n\n- **Actualizado a la economía actual**: un ebook de inversión de hace unos años puede tener datos de inflación o tipo de cambio desactualizados.\n- **Incluye planillas o solo texto**: los mejores suman una planilla de cálculo lista para usar, no solo teoría.\n- **Quién lo escribe**: buscá que el autor tenga trayectoria real en finanzas, no solo un curso de "cómo vender un ebook".',
 '2026-08-21'),

('desarrollo-personal',
 'Los mejores ebooks de hábitos y desarrollo personal',
 'ebooks',
 'Comparamos los ebooks de hábitos y desarrollo personal más vendidos, con sistemas prácticos en vez de solo motivación.',
 '## Qué mirar antes de comprar\n\n- **Sistema concreto, no solo frases motivadoras**: buscá que tenga ejercicios o pasos aplicables, no solo inspiración.\n- **Extensión razonable**: los mejores de este rubro son cortos y accionables — desconfiá de los "manuales" de 300 páginas.\n- **Formato de entrega**: PDF descargable siempre funciona; si depende de una app propia, confirmá que sea compatible con tu celular.',
 CURDATE());

-- Cursos: marketing digital
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('marketing-digital', 'Curso Completo de Marketing Digital y Ventas Online', 'curso-marketing-digital-ventas-online', 39999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-1', 'Acceso de por vida', 1),
('marketing-digital', 'Método de Ads para Vender Todos los Días', 'metodo-de-ads-para-vender-todos-los-dias', 54999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-2', 'Certificado incluido', 2),
('marketing-digital', 'Copywriting para Redes Sociales: De Cero a Vendedor', 'copywriting-para-redes-sociales', 27999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-3', '35% OFF', 3),
('marketing-digital', 'Email Marketing Automatizado para Emprendedores', 'email-marketing-automatizado', 32999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-4', 'Acceso de por vida', 4),
('marketing-digital', 'Formación en Marketing de Afiliados desde Cero', 'marketing-de-afiliados-desde-cero', 44999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-5', 'Bono: plantillas incluidas', 5);

-- Cursos: programación y tech
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('programacion-y-tech', 'Curso de Desarrollo Web Full Stack con React y Node', 'desarrollo-web-full-stack-react-node', 44999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-17', 'Acceso de por vida', 1),
('programacion-y-tech', 'Python para Data Science y Automatización', 'python-data-science-automatizacion', 39999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-18', 'Certificado incluido', 2),
('programacion-y-tech', 'Curso de Programación en Español desde Cero', 'programacion-en-espanol-desde-cero', 24999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-19', 'Ideal para empezar', 3),
('programacion-y-tech', 'DevOps y Cloud: AWS para Principiantes', 'devops-cloud-aws-principiantes', 49999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-20', '35% OFF', 4),
('programacion-y-tech', 'Bootcamp de Programación: Del Cero al Primer Empleo', 'bootcamp-programacion-primer-empleo', 69999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-21', 'Certificado + acceso de por vida', 5);

-- Plantillas: Notion y productividad
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('notion-y-productividad', 'Sistema Notion para Organizar tu Vida y tu Negocio', 'sistema-notion-vida-y-negocio', 22999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-22', 'Incluye video tutorial', 1),
('notion-y-productividad', 'Notion para Freelancers: Clientes, Facturas y Proyectos', 'notion-para-freelancers', 18999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-23', 'Acceso de por vida', 2),
('notion-y-productividad', 'Planner Digital 2026 para Notion', 'planner-digital-2026-notion', 12999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-24', '20% OFF', 3),
('notion-y-productividad', 'Dashboard de Finanzas Personales para Notion', 'dashboard-finanzas-personales-notion', 15999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-25', 'Incluye tutorial en video', 4),
('notion-y-productividad', 'Segundo Cerebro: Sistema de Notas en Notion', 'segundo-cerebro-notion', 26999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-26', 'Bestseller', 5);

-- Plantillas: presentaciones y Canva
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('presentaciones-y-canva', 'Pack de Plantillas de Presentaciones para Pitch Deck', 'plantillas-presentaciones-pitch-deck', 24, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-1', '50 slides editables', 1),
('presentaciones-y-canva', 'Plantillas de Canva para Redes Sociales (Pack x100)', 'plantillas-canva-redes-sociales', 19, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-2', 'Edición 100% online', 2),
('presentaciones-y-canva', 'Kit de Presentación Corporativa Minimalista', 'kit-presentacion-corporativa-minimalista', 16, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-3', 'Compatible con PowerPoint', 3),
('presentaciones-y-canva', 'Plantillas de Historias y Posts para Instagram', 'plantillas-historias-posts-instagram', 14, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-4', 'Actualización mensual', 4),
('presentaciones-y-canva', 'Pack Premium de Infografías Editables', 'pack-infografias-editables', 21, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-5', '30% OFF', 5);

-- Software: IA y automatización
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('ia-y-automatizacion', 'Kit de Prompts de IA para Negocios y Marketing', 'kit-prompts-ia-negocios-marketing', 19999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-27', 'Más de 500 prompts', 1),
('ia-y-automatizacion', 'Plantilla de Automatización con IA para Atención al Cliente', 'automatizacion-ia-atencion-al-cliente', 27999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-28', 'Incluye guía de instalación', 2),
('ia-y-automatizacion', 'Generador de Contenido con IA: Licencia Anual', 'generador-contenido-ia-licencia-anual', 44999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-29', 'Incluye actualizaciones', 3),
('ia-y-automatizacion', 'Bot de WhatsApp con IA para Reservas y Consultas', 'bot-whatsapp-ia-reservas-consultas', 32999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-30', 'Setup incluido', 4),
('ia-y-automatizacion', 'Curso + Plantillas de Automatización sin Código', 'curso-automatizacion-sin-codigo', 34999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-6', 'Acceso de por vida', 5);

-- Software: plugins y temas de WordPress
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('plugins-wordpress', 'Plugin de WordPress para Landing Pages de Afiliados', 'plugin-landing-pages-afiliados', 39, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-6', 'Actualizaciones incluidas', 1),
('plugins-wordpress', 'Tema Premium de WordPress para Tiendas Online', 'tema-wordpress-tiendas-online', 59, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-7', 'Soporte 6 meses', 2),
('plugins-wordpress', 'Plugin de Reservas y Turnos para WordPress', 'plugin-reservas-turnos-wordpress', 45, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-9', 'Compatible con WooCommerce', 3),
('plugins-wordpress', 'Constructor de Landing Pages Drag & Drop', 'constructor-landing-pages-drag-drop', 49, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-10', 'Licencia de por vida', 4),
('plugins-wordpress', 'Plugin de SEO y Velocidad para WordPress', 'plugin-seo-velocidad-wordpress', 29, 'USD', 'Envato Elements', 'https://elements.envato.com/PEGAR-LINK-8', '20% OFF', 5);

-- Ebooks: finanzas personales
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('finanzas-personales', 'Guía Definitiva de Finanzas Personales para Argentina', 'guia-finanzas-personales-argentina', 12999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-7', 'Actualizado 2026', 1),
('finanzas-personales', 'Ebook: Cómo Invertir tus Primeros Ahorros', 'como-invertir-tus-primeros-ahorros', 9999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-8', 'Incluye planillas de cálculo', 2),
('finanzas-personales', 'Del Sueldo a la Libertad Financiera', 'del-sueldo-a-la-libertad-financiera', 14999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-9', 'Bestseller', 3),
('finanzas-personales', 'Guía Práctica de Dolarización para Principiantes', 'guia-dolarizacion-para-principiantes', 10999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-10', '25% OFF', 4),
('finanzas-personales', 'Presupuesto Personal Simplificado: Ebook + Planillas', 'presupuesto-personal-simplificado', 8999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-11', 'Acceso inmediato', 5);

-- Ebooks: desarrollo personal
INSERT INTO productos (subcategoria_slug, nombre, slug, precio, moneda, plataforma, link, destacado, orden) VALUES
('desarrollo-personal', 'Hábitos Atómicos para tu Día a Día: Guía Práctica', 'habitos-atomicos-dia-a-dia', 7999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-12', 'Bestseller', 1),
('desarrollo-personal', 'Ebook: Productividad sin Estrés', 'productividad-sin-estres', 8999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-13', 'Incluye planner', 2),
('desarrollo-personal', 'Guía de Autoconocimiento y Metas 2026', 'autoconocimiento-y-metas-2026', 9999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-14', 'Acceso de por vida', 3),
('desarrollo-personal', 'Del Caos a la Rutina: Sistema de Hábitos', 'del-caos-a-la-rutina', 6999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-15', '30% OFF', 4),
('desarrollo-personal', 'Ebook: Mentalidad de Crecimiento para Emprendedores', 'mentalidad-de-crecimiento-emprendedores', 10999, 'ARS', 'Hotmart', 'https://hotmart.com/es/marketplace/PEGAR-LINK-16', 'Certificado incluido', 5);
