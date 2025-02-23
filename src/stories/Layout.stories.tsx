import type { Meta, StoryObj } from '@storybook/react';
import {Container} from '../components/layout/Container.tsx';
import { Box } from '../components/layout/Box.tsx';
import { Stack } from '../components/layout/Stack.tsx';
import { Flex } from '../components/layout/Flex.tsx';
import { Section } from '../components/layout/Section.tsx';
import { AspectRatio } from '../components/layout/AspectRatio.tsx';

const meta = {
    title: 'Layout',
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Containers: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Container size="sm" className="bg-muted border border-gray-300">
                Small Container
            </Container>
            <Container size="md" className="bg-muted border border-gray-300">
                Medium Container
            </Container>
            <Container size="lg" className="bg-muted border border-gray-300">
                Large Container
            </Container>
        </div>
    ),
};

export const Boxes: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Box padding="md" rounded="md" border="default" shadow="md">
                Basic Box
            </Box>
            <Box
                padding="lg"
                rounded="xl"
                border="thick"
                shadow="xl"
                className="bg-primary/10"
            >
                Styled Box
            </Box>
        </div>
    ),
};

export const Stacks: StoryObj = {
    render: () => (
        <div className="space-y-4">
            <Stack spacing="md" className="bg-muted border border-gray-300 p-6">
                <div className="bg-primary/20 p-4">Item 1</div>
                <div className="bg-primary/20 p-4">Item 2</div>
                <div className="bg-primary/20 p-4">Item 3</div>
            </Stack>

            <Stack direction="row" spacing="md" className="bg-muted border border-gray-300 p-6">
                <div className="bg-primary/20 p-4">Item 1</div>
                <div className="bg-primary/20 p-4">Item 2</div>
                <div className="bg-primary/20 p-4">Item 3</div>
            </Stack>
        </div>
    ),
};

export const FlexLayouts: StoryObj = {
    render: () => (
        <Flex
            direction="row"
            wrap="wrap"
            justify="between"
            align="center"
            gap="md"
            className="bg-muted border border-gray-300 p-6"
        >
            <div className="bg-primary/20 p-4">Flex Item 1</div>
            <div className="bg-primary/20 p-4">Flex Item 2</div>
            <div className="bg-primary/20 p-4">Flex Item 3</div>
        </Flex>
    ),
};

export const Sections: StoryObj = {
    render: () => (
        <div
            className="bg-muted border border-gray-300 p-6 space-y-4"
        >
            <Section background="default" spacing="lg">
                Default Section
            </Section>
            <Section background="primary" spacing="xl">
                Primary Section
            </Section>
        </div>
    ),
};

export const AspectRatios: StoryObj = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <AspectRatio ratio={16 / 9}>
                <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Image"
                    className="object-cover w-full h-full rounded-md"
                />
            </AspectRatio>
            <AspectRatio ratio={1}>
                <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Image"
                    className="object-cover w-full h-full rounded-md"
                />
            </AspectRatio>
        </div>
    ),
};

