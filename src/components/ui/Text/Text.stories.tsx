import { StoryFn, Meta } from '@storybook/react';
import Text from './Text';

export default {
    title: 'Components/Text',
    component: Text,
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'This is a sample text.',
};
