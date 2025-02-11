/// <reference types="vitest" />

import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { join } from 'pathe'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import inspect from 'vite-plugin-inspect'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    !process.env.VITEST && !process.env.STORYBOOK && reactRouter(),
    tsconfigPaths(),
    tailwindcss(),
    !process.env.CI &&
      !process.env.STORYBOOK &&
      visualizer({ emitFile: true, template: 'treemap' }),
    !process.env.STORYBOOK && inspect({ build: false, open: false }),
  ],
  optimizeDeps: {
    exclude: ['@heroui_code.js', '@heroui_snippet.js'],
  },
  envDir: join(__dirname),
  envPrefix: ['VITE_'],
  define: {
    'import.meta.env.APP_VERSION': `"${process.env.npm_package_version}"`,
  },
  publicDir: 'public',
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
    reportCompressedSize: false,
    // outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      // input: { app: resolve(__dirname, 'index.html') },
    },
  },
  base: '/',
  server: {
    port: 3000,
    strictPort: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\//, ''),
    //   },
    // },
  },
  test: {
    environment: 'happy-dom',
    // Additionally, this is to load ".env.example.tests" during vitest
    env: loadEnv('test', process.cwd(), ''),
    setupFiles: ['tests/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'tests-e2e'],
    reporters: process.env.CI ? ['html', 'github-actions'] : ['html', 'default'],
    outputFile: {
      json: './tests-results/vitest-results.json',
      html: './tests-results/index.html',
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['html-spa', 'text-summary'],
      reportsDirectory: './tests-results/coverage',
      include: ['~/**/*.{js,jsx,ts,tsx}'],
      cleanOnRerun: true,
      clean: true,
      thresholds: {
        global: {
          statements: 80,
          branches: 70,
          functions: 75,
          lines: 80,
        },
      },
    },
    dir: 'tests',
    globals: true,
  },
})
