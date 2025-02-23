import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Text } from './Text';
import { Code } from './Code';
import { Quote } from './Quote';
import { Keyboard } from './Keyboard';

const meta = {
    title: 'typography',
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Headings: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Heading level="h1">Heading 1</Heading>
            <Heading level="h2">Heading 2</Heading>
            <Heading level="h3">Heading 3</Heading>
            <Heading level="h4">Heading 4</Heading>
            <Heading level="h5">Heading 5</Heading>
            <Heading level="h6">Heading 6</Heading>
        </div>
    ),
};

export const HeadingVariants: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Heading variant="default">Default Heading</Heading>
            <Heading variant="primary">Primary Heading</Heading>
            <Heading variant="secondary">Secondary Heading</Heading>
            <Heading variant="gradient">Gradient Heading</Heading>
            <Heading variant="destructive">Destructive Heading</Heading>
        </div>
    ),
};

export const TextExamples: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Text>Default text</Text>
            <Text variant="muted">Muted text</Text>
            <Text size="xs">Extra small text</Text>
            <Text size="xl" weight="bold">
                Extra large bold text
            </Text>
            <Text align="justify" leading="relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </Text>
        </div>
    ),
};

export const CodeExamples: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <div>
                Inline code: <Code>npm install</Code>
            </div>
            <Code block>{`
function example() {
  return "Hello, World!";
}
      `}</Code>
            <Code variant="primary">Primary code</Code>
            <Code variant="destructive">Error code</Code>
        </div>
    ),
};

export const QuoteExamples: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Quote author="Albert Einstein">
                Imagination is more important than knowledge.
            </Quote>
            <Quote
                variant="primary"
                author="Marie Curie"
                cite="https://example.com"
            >
                Nothing in life is to be feared, it is only to be understood.
            </Quote>
        </div>
    ),
};

export const KeyboardExamples: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <div>
                Press <Keyboard>⌘</Keyboard> <Keyboard combo>C</Keyboard> to copy
            </div>
            <div>
                Save with <Keyboard>Ctrl</Keyboard> <Keyboard combo>S</Keyboard>
            </div>
        </div>
    ),
};
