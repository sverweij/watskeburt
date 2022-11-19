module.exports = {
  root: true,
  ignorePatterns: ["coverage", "docs", "dist", "node_modules"],
  extends: ["moving-meadow", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  overrides: [
    {
      files: ["**/*.mjs"],
    },
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      rules: {
        "unicorn/no-null": "off",
        "unicorn/prefer-spread": "off",
        "node/no-unsupported-features/es-syntax": "off",
        "import/no-relative-parent-imports": "off",
        "sort-imports": "off",
        "unicorn/prefer-node-protocol": "error",
        "unicorn/prefer-module": "error",
        // node/no-missing-import and import/no-unresolved can't handle
        // .js extensions pointing to seemingly typescript files. No
        // man overboard as we check this with dependency-cruiser anyway
        "node/no-missing-import": "off",
        "import/no-unresolved": "off",
      },
    },
    {
      files: ["**/*.spec.ts"],
      parser: "@typescript-eslint/parser",
      env: {
        mocha: true,
      },
      rules: {
        "no-magic-numbers": "off",
        "security/detect-non-literal-require": "off",
        "security/detect-non-literal-fs-filename": "off",
        "max-lines-per-function": "off",
        "max-lines": "off",
        "no-null": "off",
      },
    },
    {
      files: ["types/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
      },
      rules: {
        "node/no-unsupported-features/es-syntax": "off",
      },
    },
  ],
};
