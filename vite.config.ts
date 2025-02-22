import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import postcssConfig from './postcss.config.ts';



// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts({ exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'] })],
    css: {
        postcss: {
            plugins: postcssConfig.plugins,
        },
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'maia-ui',
            fileName: (format) => `maia-ui.${format}.js`,
            formats: ['es', 'cjs', 'umd'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
                inlineDynamicImports: false,
                manualChunks(id) {
                    if (id.includes('node_modules/@storybook/')) {
                        return 'storybook-vendor';
                    }
                },
            },
        },
    },
});
