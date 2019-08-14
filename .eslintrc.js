const { join } = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: join(__dirname, 'tsconfig.json'),
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
