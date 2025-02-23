import { themes } from '@storybook/theming';
import type { Preview } from "@storybook/react";
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/main.tailwind.css'; // Import main Tailwind stylesheet

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: 'dark',
    },
    darkMode: {
      stylePreview: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark, // or themes.light
    },
  },
  decorators: [
    (Story) => (
        // Add a div with some Tailwind classes to test if they're working
        <div className="p-4 bg-gray-100 dark:bg-gray-800">
          <Story />
        </div>
    ),

    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
