module.exports = {
  root: true,
  ignorePatterns: ["coverage", "docs", "dist", "node_modules"],
  extends: ["moving-meadow", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  overrides: [
    {
      files: ["**/*.ts"],
      rules: {
        "unicorn/no-null": "off",
        "unicorn/prefer-spread": "off",
        "node/no-unsupported-features/es-syntax": "off",
        "import/no-relative-parent-imports": "off",
        "sort-imports": "off",
        "unicorn/no-keyword-prefix": "off",
        "unicorn/prefer-node-protocol": "error",
        "unicorn/prefer-module": "error",
        "no-use-before-define": "off",
        "import/exports-last": "off",
        // We use the typescript compiler to check for unused vars
        "@typescript-eslint/no-unused-vars": "off",
        // node/no-missing-import and import/no-unresolved can't handle
        // .js extensions pointing to seemingly typescript files. No
        // man overboard as we check this with dependency-cruiser anyway
        "node/no-missing-import": "off",
        "import/no-unresolved": "off",
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
        "node/no-unsupported-features/es-syntax": "off",
      },
    },
  ],
};
