import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vitePluginEslint from "vite-plugin-eslint";

import solid from "eslint-plugin-solid/configs/typescript";

const solidConfig = [
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
  },
];

/** @type {import("eslint").Linter.Config} */
export default tseslint.config(
  {
    ignores: ["dist/**", ".astro/**", "prettier.config.cjs", "tailwind.config.cjs", "src/env.d.ts"],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  ...solidConfig,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      vite: vitePluginEslint(),
    },
  },
);
