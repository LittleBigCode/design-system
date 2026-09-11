import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  // src/registry/_pending holds demos for components no batch has landed yet.
  // They import specifiers that do not resolve here on purpose, so they are out
  // of tsconfig.app.json's include and out of lint too, until their batch moves
  // them up into src/registry/demos/.
  globalIgnores(["dist", "src/registry/_pending"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
