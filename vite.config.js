import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  
  return {
    plugins: [vue()],
    server: {
      host: env.VITE_HOST || 'localhost',
      port: env.VITE_PORT_FRONTEND || 3000,
      
    },
  };
});
