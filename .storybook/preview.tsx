import type { Preview } from "@storybook/react";
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/main.tailwind.css'; // Import main Tailwind stylesheet


export const preview: Preview = {
  parameters: {
    layout: "fullscreen",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
        <div style={{padding: '20px'}}> {/* Add some padding for better viewing */}
          <Story />
        </div>
    ),
    withThemeByClassName({
      themes: {
        light: 'light-theme',
        dark: 'dark-theme',
      },
      defaultTheme: 'light',
    })
  ],
};

export default preview;


