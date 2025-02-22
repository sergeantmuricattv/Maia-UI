import { StoryFn, Meta } from '@storybook/react';
import ThemeEditor from './ThemeEditor.tsx';

export default {
    title: 'Components/ThemeEditor',
    component: ThemeEditor,
    parameters: {
        // Storybook parameters can be adjusted as needed
        backgrounds: {
            default: 'light',
        },
    },
} as Meta<typeof ThemeEditor>;

const Template: StoryFn<typeof ThemeEditor> = (args) => <ThemeEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: <div className="p-4 border rounded">Your component preview goes here</div>,
};
