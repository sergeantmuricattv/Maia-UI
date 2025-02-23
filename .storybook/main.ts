import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';


const configPromise: Promise<{
    stories: string[];
    addons: string[];
    core: { builder: string };
    framework: { name: string; options: {} };
    features: { storyStoreV7: boolean; interactionsDebugger: boolean; buildStoriesJson: boolean };
    docs: { autodocs: boolean }
}> = (async () => {
    return {
        stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
        addons: [
            "@storybook/addon-essentials",
            "@storybook/addon-interactions",
            "@storybook/addon-themes",
            "@chromatic-com/storybook",
            "@storybook/addon-onboarding",
        ],
        core: {
            builder: "@storybook/builder-vite",
        },
        framework: {
            name: "@storybook/react-vite",
            options: {},
        },
        features: {
            "storyStoreV7": true,
            "interactionsDebugger": true,
            "buildStoriesJson": true
        },
        docs: {
            autodocs: true
        },
    };
})();

export default configPromise;