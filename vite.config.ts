import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/**
 * Vite plugin to preserve "use client" directives in the build output.
 * This is required for Next.js App Router compatibility.
 */
function preserveUseClientDirective(): Plugin {
  const useClientFiles = new Set<string>()

  return {
    name: 'preserve-use-client',
    enforce: 'pre',

    // Track which files have "use client" directive
    transform(code, id) {
      if (id.includes('node_modules')) return null
      if (code.match(/^['"]use client['"]/m)) {
        useClientFiles.add(id)
      }
      return null
    },

    // Add the directive back to the output
    renderChunk(code, chunk) {
      if (chunk.facadeModuleId && useClientFiles.has(chunk.facadeModuleId)) {
        return `"use client";\n${code}`
      }
      return null
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preserveUseClientDirective(), react()],
  server: {
    port: 7135,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/styles': resolve(__dirname, './src/styles'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'index.client': resolve(__dirname, 'src/index.client.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
