import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        themes: {
            default: 'light',
            list: [
                { name: 'light', class: 'light-theme', color: '#ffffff' },
                { name: 'dark', class: 'dark-theme', color: '#1a1a1a' },
            ],
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'default',
                'destructive',
                'outline',
                'secondary',
                'ghost',
                'link',
                'success',
                'warning',
                'info',
                'light',
                'dark'
            ],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
        },
        state: {
            control: 'select',
            options: ['default', 'loading', 'disabled'],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
    args: {
        children: 'Button',
        variant: 'default',
    },
};

export const Destructive: Story = {
    args: {
        children: 'Delete',
        variant: 'destructive',
    },
};

export const Success: Story = {
    args: {
        children: 'Success',
        variant: 'success',
    },
};

export const Warning: Story = {
    args: {
        children: 'Warning',
        variant: 'warning',
    },
};

export const Info: Story = {
    args: {
        children: 'Info',
        variant: 'info',
    },
};

// Size variations
export const Small: Story = {
    args: {
        children: 'Small Button',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        children: 'Large Button',
        size: 'lg',
    },
};

export const ExtraLarge: Story = {
    args: {
        children: 'Extra Large',
        size: 'xl',
    },
};

// Icon button examples
export const IconButton: Story = {
    args: {
        children: '👋',
        size: 'icon',
    },
};

// States
export const Loading: Story = {
    args: {
        children: 'Loading...',
        state: 'loading',
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled',
        disabled: true,
    },
};

// Theme variations
export const Light: Story = {
    args: {
        children: 'Light Button',
        variant: 'light',
    },
};

export const Dark: Story = {
    args: {
        children: 'Dark Button',
        variant: 'dark',
    },
};