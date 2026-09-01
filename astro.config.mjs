// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://somosdigitalia.vercel.app',
    integrations: [sitemap(), react()],
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Fraunces',
            cssVariable: '--font-display',
            weights: [500, 600, 700],
            styles: ['normal', 'italic'],
            fallbacks: ['Georgia', 'Times New Roman', 'serif'],
        },
        {
            provider: fontProviders.google(),
            name: 'Work Sans',
            cssVariable: '--font-body',
            weights: [400, 500, 600],
            fallbacks: ['-apple-system', 'Segoe UI', 'sans-serif'],
        },
        {
            provider: fontProviders.google(),
            name: 'IBM Plex Mono',
            cssVariable: '--font-mono',
            weights: [400, 500],
            fallbacks: ['ui-monospace', 'SF Mono', 'monospace'],
        },
    ],
});