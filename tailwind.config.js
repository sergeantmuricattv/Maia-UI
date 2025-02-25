/** @type {import('tailwindcss').Config} */

import maiaUIPreset from './styles/tailwind-presets/default';

module.exports = {
    presets: [maiaUIPreset],
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html,mdx}",
        "./stories/**/*.{js,jsx,ts,tsx,html,mdx}",
        "./.storybook/**/*.{js,jsx,ts,tsx,html,mdx}",
        "./storybook-static/**/*.{html,js,jsx,ts,tsx,mdx}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                ...maiaUIPreset.theme.extend.colors,
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
                error: 'var(--color-error)',
                info: 'var(--color-info)',

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