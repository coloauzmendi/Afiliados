import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
    }),
});

const reviews = defineCollection({
  loader: glob({ base: "./src/content/reviews", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    sector: z.enum(["tecnologia", "finanzas", "saas-ia", "fisicos"]),
    subcategoria: z.string(),
    tipo: z.enum(["saas", "fisico", "digital", "ia"]),
    resumen: z.string(),
    fecha: z.date(),
    // Para artículo de un solo producto:
    comision: z.string().optional(),
    linkAfiliado: z.string().url().optional(),
    // Para artículo de curación con varios productos:
    productos: z
      .array(
        z.object({
          nombre: z.string(),
          precioAprox: z.string(),
          link: z.string().url(),
          destacado: z.string(), // ej: "mejor relación precio/calidad"
        }),
      )
      .optional(),
  }),
});

export const collections = { blog, reviews };
