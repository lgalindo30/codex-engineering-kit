import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: { singleQuote: true },
  lint: {
    rules: { 'no-debugger': 'error', 'no-unused-vars': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
});
