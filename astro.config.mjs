// @ts-check
import { defineConfig } from 'astro/config';
import path from "path";
import sitemap from "@astrojs/sitemap"
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import { USER } from"./src/utils/config.ts";

// https://astro.build/config
export default defineConfig({
  site: USER.SITE_URL,
  integrations: [react(), sitemap()],

  server: {
    host: true,
    
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  }
});