import type { Meta, StoryObj } from '@storybook/react';
import {Button, Select, TextField} from '../components';

const textFieldMeta = {
    title: 'Components/TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['outline', 'filled', 'flushed'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        validation: {
            control: 'select',
            options: [undefined, 'success', 'warning', 'error'],
        },
    },
} satisfies Meta<typeof TextField>;


export default textFieldMeta;
type Story = StoryObj<typeof textFieldMeta>;


// Common select options for stories
const selectOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape', disabled: true },
];

export const AllInputTypes = {
    render: () => (
        <div className="flex flex-col gap-6 w-[400px]">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Text Fields</h3>
                <TextField placeholder="Standard TextField" />
                <TextField prefix="@" suffix=".com" placeholder="With Prefix/Suffix" />
                <TextField type="password" showPasswordToggle placeholder="Password Field" />
                <TextField format="phone" placeholder="Phone Number" />
                <TextField format="currency" prefix="$" placeholder="Currency" />
                <TextField format="creditCard" placeholder="Card Number" />
                <TextField format="expDate" placeholder="Expiration Date" />
                <TextField format="cvv" placeholder="CVV" />
                <TextField format="zipCode" placeholder="Zip Code" />
                <TextField format="ssn" placeholder="Social Security Number" />
            </div>


            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Select</h3>
                <Select
                    options={selectOptions}
                    placeholder="Choose a fruit"
                />
                <Select
                    options={selectOptions}
                    placeholder="Disabled select"
                    disabled
                />
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Buttons</h3>
                <div className="flex gap-2 flex-wrap">
                    <Button variant="default">Default</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
            </div>
        </div>
    ),
};
export const TextFieldStory: Story = {
    argTypes: {
        variant: {
            control: 'select',
            options: ['outline', 'filled', 'flushed'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        validation: {
            control: 'select',
            options: [undefined, 'success', 'warning', 'error'],
        },
    },
    render: () => (
        <div className="flex flex-col gap-4 w-[300px]">
            <TextField placeholder="Standard input" />
            <TextField prefix="@" placeholder="With prefix" />
            <TextField suffix=".com" placeholder="With suffix" />
            <TextField disabled placeholder="Disabled input" />
            <TextField validation="error" helperText="Error message" placeholder="Error state" />
            <TextField type="password" showPasswordToggle placeholder="Password field" />
            <TextField format="phone" placeholder="Phone format" />
            <TextField format="currency" prefix="$" placeholder="Currency format" />
        </div>
    ),
};


// Select Stories
export const SelectStory: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-[300px]">
            <Select
                options={selectOptions}
                placeholder="Standard select"
            />
            <Select
                options={selectOptions}
                placeholder="Disabled select"
                disabled
            />
            <Select
                options={selectOptions}
                placeholder="Required select"
                required
            />
            <Select
                options={selectOptions}
                placeholder="Error state"
                error
            />
            <Select
                options={[
                    { value: 'loading', label: 'Loading...', disabled: true },
                    ...selectOptions
                ]}
                placeholder="With disabled option"
            />
        </div>
    ),
};

// Button Stories
export const ButtonStory: Story = {
    render: () => (
        <div className="space-y-4">
            {/* Variants */}
            <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
                <Button variant="light">Light</Button>
                <Button variant="dark">Dark</Button>
            </div>

            {/* Sizes */}
            <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
            </div>

            {/* Icon Buttons */}
            <div className="flex flex-wrap gap-2">
                <Button size="icon">👤</Button>
                <Button size="icon-sm">⚡</Button>
                <Button size="icon-lg">🔍</Button>
            </div>

            {/* States */}
            <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button state="loading">Loading</Button>
                <Button state="disabled">Disabled State</Button>
            </div>

            {/* Combinations */}
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Small Outline</Button>
                <Button variant="success" size="lg">Large Success</Button>
                <Button variant="destructive" disabled>Disabled Destructive</Button>
            </div>
        </div>
    ),
};

// FormField Combinations Story
export const FormFieldCombinations: Story = {
    render: () => (
        <div className="space-y-6 w-[400px]">
            {/* Login Form Example */}
            <div className="space-y-4 p-4 border rounded">
                <h3 className="text-lg font-semibold">Login Form</h3>
                <TextField prefix="@" placeholder="Username" />
                <TextField type="password" showPasswordToggle placeholder="Password" />
                <Button variant="default" className="w-full">Log In</Button>
            </div>

            {/* Payment Form Example */}
            <div className="space-y-4 p-4 border rounded">
                <h3 className="text-lg font-semibold">Payment Form</h3>
                <TextField format="currency" prefix="$" placeholder="Amount" />
                <TextField format="creditCard" placeholder="Card Number" />
                <div className="flex gap-2">
                    <TextField format="expDate" placeholder="MM/YY" />
                    <TextField format="cvv" placeholder="CVV" />
                </div>
                <Button variant="success" className="w-full">Pay Now</Button>
            </div>

            {/* Contact Form Example */}
            <div className="space-y-4 p-4 border rounded">
                <h3 className="text-lg font-semibold">Contact Form</h3>
                <TextField placeholder="Full Name" />
                <TextField format="phone" placeholder="Phone Number" />
                <TextField placeholder="Email" type="email" suffix="@example.com" />
                <Select
                    options={[
                        { value: 'support', label: 'Support' },
                        { value: 'sales', label: 'Sales' },
                        { value: 'other', label: 'Other' }
                    ]}
                    placeholder="Department"
                />
                <Button variant="default" className="w-full">Send Message</Button>
            </div>
        </div>
    ),
};

