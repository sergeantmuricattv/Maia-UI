import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../components';

const meta = {
    title: 'Display/Separator',
    component: Separator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'w-80',
    },
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
        className: 'h-20',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'OR',
        className: 'w-80',
        decorators: true,
    },
};

export const Variants: Story = {
    render: () => (
        <div className="space-y-4 w-80">
            <Separator variant="default" />
            <Separator variant="primary" />
            <Separator variant="destructive" />
            <Separator variant="gradient" />
            <Separator variant="dashed" />
            <Separator variant="dotted" />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="space-y-4 w-80">
            <Separator size="thin" />
            <Separator size="default" />
            <Separator size="thick" />
        </div>
    ),
};

export const Animated: Story = {
    args: {
        animated: true,
        className: 'w-80',
    },
};

export const WithDecorators: Story = {
    render: () => (
        <div className="space-y-4 w-80">
            <Separator label="Section 1" decorators />
            <p className="text-sm text-muted-foreground">Content for section 1</p>
            <Separator label="Section 2" decorators />
            <p className="text-sm text-muted-foreground">Content for section 2</p>
        </div>
    ),
};

export const CustomStyles: Story = {
    args: {
        className: 'w-80 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
    },
};
