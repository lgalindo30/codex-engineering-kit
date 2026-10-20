import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
    semi: true,
    printWidth: 100,
    tabWidth: 2,
    trailingComma: 'all',
    endOfLine: 'lf',
    ignorePatterns: ['dist/**', 'coverage/**', '.next/**', '.astro/**', 'bun.lock'],
  },
  lint: {
    rules: { 'no-debugger': 'error', 'no-unused-vars': 'error' },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ['dist/**', 'coverage/**', '.next/**', '.astro/**'],
  },
});
