import {StoryFn, Meta } from '@storybook/react';
import Separator from './Separator';

export default {
    title: 'Components/Separator',
    component: Separator,
} as Meta<typeof Separator>;

const Template: StoryFn<typeof Separator> = (args) => <Separator {...args} />;

export const Horizontal = Template.bind({});
Horizontal.args = {
    orientation: 'horizontal',
};

export const Vertical = Template.bind({});
Vertical.args = {
    orientation: 'vertical',
};
