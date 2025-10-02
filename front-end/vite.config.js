import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isExtension = mode === 'extension'
  
  return {
    plugins: [react(), tailwindcss()],
    
    // Different build configurations for web app vs extension
    build: {
      outDir: isExtension ? 'extension-build' : 'web-build',
      rollupOptions: isExtension ? {
        // Extension build configuration - simplified
        input: {
          content: resolve(__dirname, 'src/content-react.jsx'),
          background: resolve(__dirname, 'src/background.js'),
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        }
      } : {
        // Web app build configuration (React app)
        input: {
          main: resolve(__dirname, 'index.html'),
        }
      }
    },

    // Different base paths
    base: isExtension ? '' : '/',
    
    // Define environment variables
    define: {
      __IS_EXTENSION__: isExtension,
    }
  }
})
