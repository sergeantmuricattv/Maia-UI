import type { StorybookConfig } from "@storybook/react-vite";


const configPromise: Promise<StorybookConfig> = (async () => {
    return {
        stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
    };
})();

export default configPromise;