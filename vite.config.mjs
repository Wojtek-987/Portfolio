import { defineConfig } from 'vite';

export default defineConfig({
    root: './src',
    build: {
        outDir: './dist',
        rollupOptions: {
            input: {
                main: './src/index.html',
                contact: './src/contact.html'
            },
        },
        sourcemap: true
    },
    css: {
        devSourcemap: true
    }
});