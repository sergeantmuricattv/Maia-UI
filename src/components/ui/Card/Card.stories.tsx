import type { Meta, StoryObj } from '@storybook/react';
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from './Card';
import { Button } from '../Button/Button';

const meta = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle subtitle="Premium Plan">Upgrade Your Account</CardTitle>
                <CardDescription>
                    Get access to all premium features and support.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p>✓ Unlimited projects</p>
                    <p>✓ Advanced analytics</p>
                    <p>✓ Priority support</p>
                    <p>✓ Custom domain</p>
                </div>
            </CardContent>
            <CardFooter divider>
                <Button className="w-full">Upgrade Now</Button>
            </CardFooter>
        </Card>
    ),
};

export const Interactive: Story = {
    render: () => (
        <Card variant="interactive" className="w-[350px]">
            <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see the effect</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This card has hover animations and effects.</p>
            </CardContent>
        </Card>
    ),
};

export const Loading: Story = {
    render: () => (
        <Card loading className="w-[350px]">
            <CardHeader>
                <CardTitle>Loading State</CardTitle>
                <CardDescription>This card is in a loading state</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content is loading...</p>
            </CardContent>
        </Card>
    ),
};

export const Elevated: Story = {
    render: () => (
        <Card variant="elevated" size="sm">
            <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>With enhanced shadow</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This card has a more prominent shadow.</p>
            </CardContent>
        </Card>
    ),
};