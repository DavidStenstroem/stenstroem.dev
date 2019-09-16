const { join } = require('path')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    project: [
      join(__dirname, './tsconfig.json'),
      join(__dirname, './packages/app/tsconfig.json'),
      join(__dirname, './packages/server/tsconfig.json'),
      join(__dirname, './packages/shared/tsconfig.json'),
    ],
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
}
