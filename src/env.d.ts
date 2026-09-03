/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	/** ID de medición de Google Analytics (ej. "G-XXXXXXXXXX"). Opcional. */
	readonly PUBLIC_GA_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
