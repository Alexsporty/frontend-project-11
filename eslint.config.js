// eslint.config.js
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-unused-vars': ['warn'],
    },
  },
]
