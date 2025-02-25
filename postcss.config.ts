import * as path from "node:path";
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        postcssImport({
            filter: (filePath) => !filePath.includes(path.join('node_modules', 'tailwindcss', 'lib')),
        }),
        tailwindcss(),
        autoprefixer,
    ]
};
