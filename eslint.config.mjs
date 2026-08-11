import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Template-original animation components intentionally trigger
      // mount animations via setState-in-effect (hero blur-reveal,
      // count-up metrics, carousels). Downgrade to warning — behavior
      // is correct, rule is stylistic for this codebase.
      "react-hooks/set-state-in-effect": "warn",
      // Metrics/sidebar use Math.random() seeds for visual variety;
      // impure during render by design.
      "react-hooks/purity": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
