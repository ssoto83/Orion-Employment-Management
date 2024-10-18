import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
=======
    port: 3001,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http/localhost:3001',
        secure:false,
        changeOrigin:true
      }
    }
  }
})
>>>>>>> 25f2957a30c88ed066ef8be52d92aa4ab8788619
