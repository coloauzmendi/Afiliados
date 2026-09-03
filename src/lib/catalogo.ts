// Catálogo de ejemplo, hardcodeado acá mismo — sin base de datos, sin .env,
// sin nada que configurar. `npm install && npm run dev` y ya está andando.
//
// Para armar tu propio sitio a partir de esta plantilla: reemplazá los
// arrays SUBCATEGORIAS y PRODUCTOS de acá abajo por tu catálogo real. Las
// funciones de más abajo (getSubcategorias, getTodosLosProductos, etc.) son
// la única "API" que usan las páginas — mientras devuelvan datos con esta
// misma forma, no hace falta tocar nada más del sitio.
//
// Si en algún momento preferís cargar el catálogo desde una base de datos de
// verdad (para poder sumar productos sin tocar código ni redeployar), esta
// misma interfaz es fácil de reimplementar contra MySQL/Postgres/lo que
// sea: son 4 funciones, todas async, cada una devolviendo estos mismos
// tipos.

export interface Subcategoria {
	slug: string;
	title: string;
	sector: string;
	resumen: string;
	contenido: string | null;
	fecha: Date;
}

export interface Precio {
	valor: number;
	moneda: string;
}

export interface SubcategoriaConDesde extends Subcategoria {
	desde: Precio | null;
	imagenPortada: string | null;
}

export interface Producto {
	id: number;
	subcategoriaSlug: string;
	nombre: string;
	slug: string;
	precio: number;
	moneda: string;
	plataforma: string;
	link: string;
	destacado: string | null;
	imagen: string | null;
	resena: string | null;
}

export interface Comentario {
	id: number;
	productoId: number;
	nombre: string;
	comentario: string;
	creadoEn: Date;
}

const SUBCATEGORIAS: Subcategoria[] = [
	{
		slug: 'marketing-digital',
		title: 'Los mejores cursos de marketing digital y ventas online',
		sector: 'cursos',
		resumen:
			'Comparamos los cursos de marketing digital y ventas online mejor valorados, para arrancar a vender sin perder tiempo en teoría de más.',
		contenido: `## Qué mirar antes de comprar

- **Acceso de por vida o por tiempo limitado**: en Hotmart la mayoría es de por vida, pero conviene chequearlo en la página de venta antes de pagar.
- **Certificado**: si te sirve para tu CV o LinkedIn, fijate que lo incluya sin costo extra.
- **Actualizaciones**: marketing digital cambia rápido — un curso de 2022 sin actualizar puede tener herramientas que ya no existen.`,
		fecha: new Date('2026-08-20'),
	},
	{
		slug: 'programacion-y-tech',
		title: 'Los mejores cursos de programación y tecnología',
		sector: 'cursos',
		resumen: 'Comparamos los cursos de programación y tecnología mejor valorados en Hotmart, para todos los niveles.',
		contenido: `## Qué mirar antes de comprar

- **Nivel real**: leé la descripción completa, no solo el título — "desde cero" a veces asume que ya sabés programar.
- **Proyectos prácticos**: un curso con proyectos reales para armar portfolio vale mucho más que uno solo teórico.
- **Actualizado a versiones actuales**: un curso de hace 3 años puede enseñar una versión de lenguaje o framework que ya cambió — fijate la fecha de la última actualización.`,
		fecha: new Date('2026-08-22'),
	},
	{
		slug: 'notion-y-productividad',
		title: 'Las mejores plantillas de Notion para organizarte',
		sector: 'plantillas',
		resumen:
			'Comparamos las plantillas de Notion más vendidas para organizar tu vida, tus proyectos o tu negocio sin armar todo desde cero.',
		contenido: `## Qué mirar antes de comprar

- **Compatibilidad**: algunas plantillas están pensadas para Notion gratis y otras necesitan el plan pago — fijate antes de comprar.
- **Tutorial incluido**: una plantilla compleja sin video explicativo te puede llevar horas entender.
- **Actualizaciones**: buscá vendedores que sigan actualizando la plantilla, no algo abandonado hace dos años.`,
		fecha: new Date('2026-08-18'),
	},
	{
		slug: 'presentaciones-y-canva',
		title: 'Las mejores plantillas de presentaciones y Canva',
		sector: 'plantillas',
		resumen:
			'Comparamos los packs de plantillas de presentaciones y Canva más vendidos, para armar algo profesional sin depender de un diseñador.',
		contenido: `## Qué mirar antes de comprar

- **Formato**: chequeá si es editable en Canva, PowerPoint, Google Slides o los tres — no todos los packs sirven en todas las herramientas.
- **Licencia de uso**: para uso comercial (venderle a un cliente) algunas plantillas piden una licencia extendida.
- **Cantidad real de slides únicos**: "100 slides" a veces son variaciones de los mismos 10 diseños.`,
		fecha: new Date('2026-08-15'),
	},
	{
		slug: 'ia-y-automatizacion',
		title: 'Las mejores herramientas de IA y automatización',
		sector: 'software',
		resumen:
			'Comparamos kits, plantillas y licencias de herramientas de IA y automatización para ahorrar horas de trabajo repetitivo.',
		contenido: `## Qué mirar antes de comprar

- **Necesitás una cuenta de otra plataforma**: muchos kits de IA funcionan sobre ChatGPT, Make o Zapier — confirmá que ya tenés (o vas a pagar) esa cuenta.
- **Licencia de por vida vs. suscripción**: algunas herramientas cobran una vez, otras mensual — leé bien qué estás pagando.
- **Soporte de instalación**: si no sos técnico, priorizá los que incluyen guía o setup asistido.`,
		fecha: new Date('2026-08-24'),
	},
	{
		slug: 'plugins-wordpress',
		title: 'Los mejores plugins y temas para WordPress',
		sector: 'software',
		resumen: 'Comparamos los plugins y temas premium de WordPress más vendidos en Envato, para no reinventar la rueda en cada proyecto.',
		contenido: `## Qué mirar antes de comprar

- **Compatibilidad de versión**: fijate la última fecha de actualización del plugin contra la versión de WordPress que usás.
- **Meses de soporte incluidos**: en Envato suele venir con 6 meses de soporte — después es opcional y pago.
- **Reseñas de compradores reales**: en Envato las calificaciones y comentarios son bastante confiables para detectar plugins con bugs.`,
		fecha: new Date('2026-08-19'),
	},
	{
		slug: 'finanzas-personales',
		title: 'Los mejores ebooks de finanzas personales e inversión',
		sector: 'ebooks',
		resumen: 'Comparamos los ebooks de finanzas personales e inversión mejor valorados, pensados para el contexto argentino.',
		contenido: `## Qué mirar antes de comprar

- **Actualizado a la economía actual**: un ebook de inversión de hace unos años puede tener datos de inflación o tipo de cambio desactualizados.
- **Incluye planillas o solo texto**: los mejores suman una planilla de cálculo lista para usar, no solo teoría.
- **Quién lo escribe**: buscá que el autor tenga trayectoria real en finanzas, no solo un curso de "cómo vender un ebook".`,
		fecha: new Date('2026-08-21'),
	},
	{
		slug: 'desarrollo-personal',
		title: 'Los mejores ebooks de hábitos y desarrollo personal',
		sector: 'ebooks',
		resumen: 'Comparamos los ebooks de hábitos y desarrollo personal más vendidos, con sistemas prácticos en vez de solo motivación.',
		contenido: `## Qué mirar antes de comprar

- **Sistema concreto, no solo frases motivadoras**: buscá que tenga ejercicios o pasos aplicables, no solo inspiración.
- **Extensión razonable**: los mejores de este rubro son cortos y accionables — desconfiá de los "manuales" de 300 páginas.
- **Formato de entrega**: PDF descargable siempre funciona; si depende de una app propia, confirmá que sea compatible con tu celular.`,
		fecha: new Date('2026-08-25'),
	},
];

const PRODUCTOS: Producto[] = [
	// Cursos: marketing digital
	{ id: 1, subcategoriaSlug: 'marketing-digital', nombre: 'Curso Completo de Marketing Digital y Ventas Online', slug: 'curso-marketing-digital-ventas-online', precio: 39999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-1', destacado: 'Acceso de por vida', imagen: null, resena: null },
	{ id: 2, subcategoriaSlug: 'marketing-digital', nombre: 'Método de Ads para Vender Todos los Días', slug: 'metodo-de-ads-para-vender-todos-los-dias', precio: 54999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-2', destacado: 'Certificado incluido', imagen: null, resena: null },
	{ id: 3, subcategoriaSlug: 'marketing-digital', nombre: 'Copywriting para Redes Sociales: De Cero a Vendedor', slug: 'copywriting-para-redes-sociales', precio: 27999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-3', destacado: '35% OFF', imagen: null, resena: null },
	{ id: 4, subcategoriaSlug: 'marketing-digital', nombre: 'Email Marketing Automatizado para Emprendedores', slug: 'email-marketing-automatizado', precio: 32999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-4', destacado: 'Acceso de por vida', imagen: null, resena: null },
	{ id: 5, subcategoriaSlug: 'marketing-digital', nombre: 'Formación en Marketing de Afiliados desde Cero', slug: 'marketing-de-afiliados-desde-cero', precio: 44999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-5', destacado: 'Bono: plantillas incluidas', imagen: null, resena: null },

	// Cursos: programación y tech
	{ id: 6, subcategoriaSlug: 'programacion-y-tech', nombre: 'Curso de Desarrollo Web Full Stack con React y Node', slug: 'desarrollo-web-full-stack-react-node', precio: 44999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-17', destacado: 'Acceso de por vida', imagen: null, resena: null },
	{ id: 7, subcategoriaSlug: 'programacion-y-tech', nombre: 'Python para Data Science y Automatización', slug: 'python-data-science-automatizacion', precio: 39999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-18', destacado: 'Certificado incluido', imagen: null, resena: null },
	{ id: 8, subcategoriaSlug: 'programacion-y-tech', nombre: 'Curso de Programación en Español desde Cero', slug: 'programacion-en-espanol-desde-cero', precio: 24999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-19', destacado: 'Ideal para empezar', imagen: null, resena: null },
	{ id: 9, subcategoriaSlug: 'programacion-y-tech', nombre: 'DevOps y Cloud: AWS para Principiantes', slug: 'devops-cloud-aws-principiantes', precio: 49999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-20', destacado: '35% OFF', imagen: null, resena: null },
	{ id: 10, subcategoriaSlug: 'programacion-y-tech', nombre: 'Bootcamp de Programación: Del Cero al Primer Empleo', slug: 'bootcamp-programacion-primer-empleo', precio: 69999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-21', destacado: 'Certificado + acceso de por vida', imagen: null, resena: null },

	// Plantillas: Notion y productividad
	{ id: 11, subcategoriaSlug: 'notion-y-productividad', nombre: 'Sistema Notion para Organizar tu Vida y tu Negocio', slug: 'sistema-notion-vida-y-negocio', precio: 22999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-22', destacado: 'Incluye video tutorial', imagen: null, resena: null },
	{ id: 12, subcategoriaSlug: 'notion-y-productividad', nombre: 'Notion para Freelancers: Clientes, Facturas y Proyectos', slug: 'notion-para-freelancers', precio: 18999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-23', destacado: 'Acceso de por vida', imagen: null, resena: null },
	{ id: 13, subcategoriaSlug: 'notion-y-productividad', nombre: 'Planner Digital 2026 para Notion', slug: 'planner-digital-2026-notion', precio: 12999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-24', destacado: '20% OFF', imagen: null, resena: null },
	{ id: 14, subcategoriaSlug: 'notion-y-productividad', nombre: 'Dashboard de Finanzas Personales para Notion', slug: 'dashboard-finanzas-personales-notion', precio: 15999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-25', destacado: 'Incluye tutorial en video', imagen: null, resena: null },
	{ id: 15, subcategoriaSlug: 'notion-y-productividad', nombre: 'Segundo Cerebro: Sistema de Notas en Notion', slug: 'segundo-cerebro-notion', precio: 26999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-26', destacado: 'Bestseller', imagen: null, resena: null },

	// Plantillas: presentaciones y Canva
	{ id: 16, subcategoriaSlug: 'presentaciones-y-canva', nombre: 'Pack de Plantillas de Presentaciones para Pitch Deck', slug: 'plantillas-presentaciones-pitch-deck', precio: 24, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-1', destacado: '50 slides editables', imagen: null, resena: null },
	{ id: 17, subcategoriaSlug: 'presentaciones-y-canva', nombre: 'Plantillas de Canva para Redes Sociales (Pack x100)', slug: 'plantillas-canva-redes-sociales', precio: 19, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-2', destacado: 'Edición 100% online', imagen: null, resena: null },
	{ id: 18, subcategoriaSlug: 'presentaciones-y-canva', nombre: 'Kit de Presentación Corporativa Minimalista', slug: 'kit-presentacion-corporativa-minimalista', precio: 16, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-3', destacado: 'Compatible con PowerPoint', imagen: null, resena: null },
	{ id: 19, subcategoriaSlug: 'presentaciones-y-canva', nombre: 'Plantillas de Historias y Posts para Instagram', slug: 'plantillas-historias-posts-instagram', precio: 14, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-4', destacado: 'Actualización mensual', imagen: null, resena: null },
	{ id: 20, subcategoriaSlug: 'presentaciones-y-canva', nombre: 'Pack Premium de Infografías Editables', slug: 'pack-infografias-editables', precio: 21, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-5', destacado: '30% OFF', imagen: null, resena: null },

	// Software: IA y automatización
	{ id: 21, subcategoriaSlug: 'ia-y-automatizacion', nombre: 'Kit de Prompts de IA para Negocios y Marketing', slug: 'kit-prompts-ia-negocios-marketing', precio: 19999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-27', destacado: 'Más de 500 prompts', imagen: null, resena: null },
	{ id: 22, subcategoriaSlug: 'ia-y-automatizacion', nombre: 'Plantilla de Automatización con IA para Atención al Cliente', slug: 'automatizacion-ia-atencion-al-cliente', precio: 27999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-28', destacado: 'Incluye guía de instalación', imagen: null, resena: null },
	{ id: 23, subcategoriaSlug: 'ia-y-automatizacion', nombre: 'Generador de Contenido con IA: Licencia Anual', slug: 'generador-contenido-ia-licencia-anual', precio: 44999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-29', destacado: 'Incluye actualizaciones', imagen: null, resena: null },
	{ id: 24, subcategoriaSlug: 'ia-y-automatizacion', nombre: 'Bot de WhatsApp con IA para Reservas y Consultas', slug: 'bot-whatsapp-ia-reservas-consultas', precio: 32999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-30', destacado: 'Setup incluido', imagen: null, resena: null },
	{ id: 25, subcategoriaSlug: 'ia-y-automatizacion', nombre: 'Curso + Plantillas de Automatización sin Código', slug: 'curso-automatizacion-sin-codigo', precio: 34999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-6', destacado: 'Acceso de por vida', imagen: null, resena: null },

	// Software: plugins y temas de WordPress
	{ id: 26, subcategoriaSlug: 'plugins-wordpress', nombre: 'Plugin de WordPress para Landing Pages de Afiliados', slug: 'plugin-landing-pages-afiliados', precio: 39, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-6', destacado: 'Actualizaciones incluidas', imagen: null, resena: null },
	{ id: 27, subcategoriaSlug: 'plugins-wordpress', nombre: 'Tema Premium de WordPress para Tiendas Online', slug: 'tema-wordpress-tiendas-online', precio: 59, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-7', destacado: 'Soporte 6 meses', imagen: null, resena: null },
	{ id: 28, subcategoriaSlug: 'plugins-wordpress', nombre: 'Plugin de Reservas y Turnos para WordPress', slug: 'plugin-reservas-turnos-wordpress', precio: 45, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-9', destacado: 'Compatible con WooCommerce', imagen: null, resena: null },
	{ id: 29, subcategoriaSlug: 'plugins-wordpress', nombre: 'Constructor de Landing Pages Drag & Drop', slug: 'constructor-landing-pages-drag-drop', precio: 49, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-10', destacado: 'Licencia de por vida', imagen: null, resena: null },
	{ id: 30, subcategoriaSlug: 'plugins-wordpress', nombre: 'Plugin de SEO y Velocidad para WordPress', slug: 'plugin-seo-velocidad-wordpress', precio: 29, moneda: 'USD', plataforma: 'Envato Elements', link: 'https://elements.envato.com/PEGAR-LINK-8', destacado: '20% OFF', imagen: null, resena: null },

	// Ebooks: finanzas personales
	{ id: 31, subcategoriaSlug: 'finanzas-personales', nombre: 'Guía Definitiva de Finanzas Personales para Argentina', slug: 'guia-finanzas-personales-argentina', precio: 12999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-7', destacado: 'Actualizado 2026', imagen: null, resena: null },
	{ id: 32, subcategoriaSlug: 'finanzas-personales', nombre: 'Ebook: Cómo Invertir tus Primeros Ahorros', slug: 'como-invertir-tus-primeros-ahorros', precio: 9999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-8', destacado: 'Incluye planillas de cálculo', imagen: null, resena: null },
	{ id: 33, subcategoriaSlug: 'finanzas-personales', nombre: 'Del Sueldo a la Libertad Financiera', slug: 'del-sueldo-a-la-libertad-financiera', precio: 14999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-9', destacado: 'Bestseller', imagen: null, resena: null },
	{ id: 34, subcategoriaSlug: 'finanzas-personales', nombre: 'Guía Práctica de Dolarización para Principiantes', slug: 'guia-dolarizacion-para-principiantes', precio: 10999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-10', destacado: '25% OFF', imagen: null, resena: null },
	{ id: 35, subcategoriaSlug: 'finanzas-personales', nombre: 'Presupuesto Personal Simplificado: Ebook + Planillas', slug: 'presupuesto-personal-simplificado', precio: 8999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-11', destacado: 'Acceso inmediato', imagen: null, resena: null },

	// Ebooks: desarrollo personal
	{ id: 36, subcategoriaSlug: 'desarrollo-personal', nombre: 'Hábitos Atómicos para tu Día a Día: Guía Práctica', slug: 'habitos-atomicos-dia-a-dia', precio: 7999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-12', destacado: 'Bestseller', imagen: null, resena: null },
	{ id: 37, subcategoriaSlug: 'desarrollo-personal', nombre: 'Ebook: Productividad sin Estrés', slug: 'productividad-sin-estres', precio: 8999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-13', destacado: 'Incluye planner', imagen: null, resena: null },
	{ id: 38, subcategoriaSlug: 'desarrollo-personal', nombre: 'Guía de Autoconocimiento y Metas 2026', slug: 'autoconocimiento-y-metas-2026', precio: 9999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-14', destacado: 'Acceso de por vida', imagen: null, resena: null },
	{ id: 39, subcategoriaSlug: 'desarrollo-personal', nombre: 'Del Caos a la Rutina: Sistema de Hábitos', slug: 'del-caos-a-la-rutina', precio: 6999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-15', destacado: '30% OFF', imagen: null, resena: null },
	{ id: 40, subcategoriaSlug: 'desarrollo-personal', nombre: 'Ebook: Mentalidad de Crecimiento para Emprendedores', slug: 'mentalidad-de-crecimiento-emprendedores', precio: 10999, moneda: 'ARS', plataforma: 'Hotmart', link: 'https://hotmart.com/es/marketplace/PEGAR-LINK-16', destacado: 'Certificado incluido', imagen: null, resena: null },
];

export async function getSubcategorias(): Promise<Subcategoria[]> {
	return [...SUBCATEGORIAS].sort((a, b) => b.fecha.valueOf() - a.fecha.valueOf());
}

export async function getTodosLosProductos(): Promise<Producto[]> {
	return [...PRODUCTOS];
}

export async function getProductosPorSlug(slug: string): Promise<Producto[]> {
	return PRODUCTOS.filter((p) => p.subcategoriaSlug === slug);
}

/** Todas las subcategorías con el precio "desde" ya calculado (para las cards). */
export async function getSubcategoriasConDesde(): Promise<SubcategoriaConDesde[]> {
	const [subcategorias, productos] = await Promise.all([getSubcategorias(), getTodosLosProductos()]);

	const minPorSlug = new Map<string, Precio>();
	const imagenPorSlug = new Map<string, string>();
	for (const p of productos) {
		if (p.precio > 0) {
			const actual = minPorSlug.get(p.subcategoriaSlug);
			if (actual === undefined || p.precio < actual.valor) {
				minPorSlug.set(p.subcategoriaSlug, { valor: p.precio, moneda: p.moneda });
			}
		}
		// La imagen de portada es la del primer producto (por orden) que ya tenga una cargada.
		if (p.imagen && !imagenPorSlug.has(p.subcategoriaSlug)) {
			imagenPorSlug.set(p.subcategoriaSlug, p.imagen);
		}
	}

	return subcategorias.map((s) => ({
		...s,
		desde: minPorSlug.get(s.slug) ?? null,
		imagenPortada: imagenPorSlug.get(s.slug) ?? null,
	}));
}
