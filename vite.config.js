import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      laravel({
        input: ['resources/js/app.tsx'],
        ssr: ['resources/js/ssr.tsx'],
        refresh: true,
      }),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.mjs',
    },
    server: {
      cors: true,
      allowedHosts: true,
      host: '0.0.0.0',
      hmr: {
        host: isDev ? env.VITE_DEV_HMR_HOST || 'localhost' : 'localhost',
      },
      https: isDev ? env.VITE_DEV_HTTPS === 'true' : undefined,
    },
    resolve: {
      alias: {
        '@/assets': '/public/assets',
      },
    },
  };
});
