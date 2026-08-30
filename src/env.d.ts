/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly DB_HOST: string;
	readonly DB_PORT: string;
	readonly DB_USER: string;
	readonly DB_PASSWORD: string;
	readonly DB_NAME: string;
	/** ID de medición de Google Analytics (ej. "G-XXXXXXXXXX"). Opcional. */
	readonly PUBLIC_GA_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
