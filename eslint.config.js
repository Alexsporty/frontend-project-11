import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // базовые правила
      ...js.configs.recommended.rules,

      // стилистика (можно отключать или настраивать ниже)
      'semi': ['error', 'never'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/padded-blocks': ['error', 'never'],
    },
  },
])