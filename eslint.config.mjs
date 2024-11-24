import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/coverage", "**/docs", "**/dist", "**/node_modules"],
  },
  ...compat.extends("moving-meadow", "plugin:@typescript-eslint/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "script",
    },
  },
  {
    files: ["**/*.ts"],

    rules: {
      complexity: ["error", { max: 10 }],
      "@typescript-eslint/no-unused-vars": "off",
      "import/exports-last": "off",
      "import/no-relative-parent-imports": "off",
      "import/no-unresolved": "off",
      "n/no-missing-import": "off",
      "n/no-unsupported-features/es-syntax": "off",
      "no-use-before-define": "off",
      "sort-imports": "off",
      "unicorn/no-keyword-prefix": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-module": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-spread": "off",
    },
  },
  {
    files: ["**/*.spec.ts"],

    rules: {
      "no-magic-numbers": "off",
      "security/detect-non-literal-fs-filename": "off",
      "max-lines-per-function": "off",
      "max-lines": "off",
      "no-null": "off",
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
  {
    files: ["tools/**"],

    rules: {
      "security/detect-non-literal-fs-filename": "off",
    },
  },
  {
    files: ["types/*.ts"],

    rules: {
      "n/no-unsupported-features/es-syntax": "off",
    },
  },
];
