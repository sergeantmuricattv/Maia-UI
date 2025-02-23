// src/components/Select/Select.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Inputs/Select.tsx';
import { useState } from 'react';

const meta = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape', disabled: true },
];

export const Default: Story = {
    args: {
        options,
        placeholder: 'Select a fruit',
    },
};

export const Controlled: Story = {
    args: {
        options,
        placeholder: 'Select a fruit'
    },
    render: () => {
        const [value, setValue] = useState('banana');
        return (
            <Select
                options={options}
                value={value}
                onChange={setValue}
                className="w-[200px]"
            />
        );
    },
};

export const Disabled: Story = {
    args: {
        options,
        disabled: true,
        placeholder: 'Select disabled',
    },
};

export const WithError: Story = {
    args: {
        options,
        error: true,
        placeholder: 'Select with error',
    },
};

export const Required: Story = {
    args: {
        options,
        required: true,
        placeholder: 'Required select',
    },
};
