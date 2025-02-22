import { StoryFn, Meta } from '@storybook/react';
import Heading from './Heading';

export default {
    title: 'Components/Heading',
    component: Heading,
} as Meta<typeof Heading>;

const Template: StoryFn<typeof Heading> = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Default Heading',
    as: 'h1',
};

export const H2 = Template.bind({});
H2.args = {
    children: 'Heading Level 2',
    as: 'h2',
};
