/** @type {import('tailwindcss').Config} */

import maiaUIPreset from './styles/tailwind-presets/default';

module.exports = {
    presets: [maiaUIPreset],
    content: [
        "./src/**/*.{html,js,jsx,ts,mdx,tsx}",
        "./stories/**/*.{html,js,jsx,mdx,ts,tsx}",
        "./storybook-static/**/*.{html,js,jsx,mdx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                ...maiaUIPreset.theme.extend.colors,
                'maia-ui-blue': '#0070f3',
                'maia-ui-green': '#00c48f',
                'maia-ui-red': '#ff3860',
                'maia-ui-yellow': '#ffdd57',
                'maia-ui-gray': '#808080',
                'maia-ui-white': '#ffffff',
                'maia-ui-black': '#000000',
                'maia-ui-transparent': 'transparent',
                'maia-ui-current': 'currentColor',
            }
        }
    },
    plugins: []
};