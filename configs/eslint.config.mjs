// @diametral/design-system — shared flat ESLint config (ESLint v9+)
//
// Usage in a consuming app (eslint.config.mjs):
//
//   import diametral from "@diametral/design-system/configs/eslint.config.mjs";
//   export default diametral;
//
//   // …or extend it:
//   import diametral from "@diametral/design-system/configs/eslint.config.mjs";
//   export default [
//     ...diametral,
//     { rules: { "no-console": "warn" } },
//   ];
//
// You can also just copy this file into your repo as `eslint.config.mjs`.
//
// PEER PLUGINS — install these in the consuming app (they are intentionally
// NOT dependencies of the design system, so apps control their versions):
//
//   npm i -D eslint @eslint/js globals \
//     eslint-plugin-react eslint-plugin-react-hooks
//
//   # Optional, only if you lint TypeScript:
//   npm i -D typescript typescript-eslint
//
// TypeScript support is OPTIONAL and loaded lazily: if `typescript-eslint`
// resolves, its recommended config is applied to .ts/.tsx files; otherwise it
// is silently skipped so a plain-JS app needs no TS toolchain.

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

// Lazily/optionally pull in typescript-eslint. Wrapped in try/catch so the
// config still loads (for JS-only apps) when the package isn't installed.
let tseslintConfigs = [];
try {
  const tseslint = (await import("typescript-eslint")).default;
  tseslintConfigs = [
    ...tseslint.configs.recommended.map((c) => ({
      ...c,
      files: ["**/*.{ts,tsx,mts,cts}"],
    })),
  ];
} catch {
  // typescript-eslint not installed — JS-only project, that's fine.
}

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Ignore build output and vendored code everywhere.
  {
    ignores: ["dist/**", "build/**", "coverage/**", "node_modules/**", "**/*.min.js"],
  },

  // Recommended core JS rules.
  js.configs.recommended,

  // Project-wide language options + React/React-Hooks for all source files.
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2023,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      // Auto-detect the installed React version (avoids a noisy warning).
      react: { version: "detect" },
    },
    rules: {
      // Sensible defaults.
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": "off",
      "prefer-const": "warn",
      "eqeqeq": ["warn", "smart"],

      // React Hooks — these must stay errors: violating them breaks at runtime.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React — the new JSX transform means React need not be in scope.
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error",
    },
  },

  // Optional TypeScript layer (no-op if typescript-eslint isn't installed).
  ...tseslintConfigs,

  // In TS files the compiler already reports unused vars; let it own that.
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
