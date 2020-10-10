module.exports = {
  env: {
    es2021: true,
    node: true,
    "jest/global": true,
  },
  extends: ["standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {},
};
