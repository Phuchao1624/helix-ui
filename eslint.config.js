import eslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'artifacts/**', 'node_modules*/**', 'preview-*-static.html'] },
  {
    ...eslint.configs.recommended,
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ...eslint.configs.recommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...eslint.configs.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],
    },
  },
  {
    files: ['scripts/**/*.mjs', 'vite.config.js', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
  },
];
