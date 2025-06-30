import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, '@stylistic': stylistic  },
    extends: ['js/recommended'],
    rules: {
      '@stylistic/semi': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/no-multiple-empty-lines': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/object-curly-spacing': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/no-trailing-spaces': 'off',
      '@stylistic/padded-blocks': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
]);
