import { defineConfig } from "astro/config";

import tailwind from "@tailwindcss/vite";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },
  integrations: [
    tailwind(),
    solidJs(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
