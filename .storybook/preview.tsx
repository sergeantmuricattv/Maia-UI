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
        <div style={{ padding: '20px' }}>
          {/* Add some padding for better viewing */}
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
