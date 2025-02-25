import tokens from '../tokens/index';

module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,mdx,tsx}", // Match your main config
        "./stories/**/*.{html,js,jsx,mdx,ts,tsx}", // Match your main config
        "./storybook-static/**/*.{html,js,jsx,mdx,ts,tsx}", // Match your main config
    ], // Add these paths
    theme: {
        extend: {
            colors: {
                ...tokens.colors
            }
        }
    }
};