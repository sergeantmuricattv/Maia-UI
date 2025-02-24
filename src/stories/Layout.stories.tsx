import type { Meta, StoryObj } from '@storybook/react';
import {Container, Box, Section, Flex, Grid, Stack, AspectRatio} from '../components';

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

export const Grids: StoryObj = {
    render: () => (
        <>
            <h2 className="text-2xl font-bold mb-4">
                CSS Grid Layout (Numeric Sizes & Offset)
            </h2>
            <Grid
                container
                // Simulate CSS grid behavior with a responsive column count.
                direction="row"
                spacing={10}
                wrap="wrap"
                className="border border-dashed border-gray-300 p-4"
            >
                {/* Full-width header section */}
                <Grid item size={20} className="bg-blue-100 p-4">
                    <h1 className="text-xl font-semibold">Complete Grid Showcase</h1>
                    <p>
                        This section demonstrates numeric sizing using a simulated CSS grid.
                        Items span a number of slots out of 20.
                    </p>
                </Grid>

                {/* Two Half-Row Items */}
                <Grid item size={10} className="bg-red-200 p-4">
                    <h2 className="font-medium">Half Row</h2>
                    <p>This item takes up half the available width (10 out of 20 slots).</p>
                </Grid>
                <Grid item size={10} className="bg-green-200 p-4">
                    <h2 className="font-medium">Matching Half</h2>
                    <p>This item complements its partner to complete the full row.</p>
                </Grid>

                {/* Offset demonstration */}
                <Grid item size={10} offset={[1, 3]} className="bg-yellow-200 p-4">
                    <h2 className="font-medium">Offset Item</h2>
                    <p>
                        This item is offset by 1 (i.e. 10% right) on the x-axis and 3 (i.e.
                        30% down) on the y-axis.
                    </p>
                </Grid>

                {/* Nested Grid demonstration */}
                    <Grid container spacing={20}>
                    <Grid nested className="bg-purple-200">
                        Nested Item 1
                    </Grid>
                    <Grid nested className="bg-purple-300">
                        Nested Item 2
                    </Grid>
                    </Grid>
            </Grid>

            <h2 className="text-2xl font-bold mt-8 mb-4">
                Flex Layout (Auto & Grow)
            </h2>
            <Grid
                container
                // Omitting the columns prop triggers flex layout.
                spacing="10px"
                direction="row"
                wrap="wrap"
                className="border border-dotted border-gray-400 p-4"
            >
                {/* Auto Sizing Demonstration */}
                <Grid item size="auto">
                    <div className="bg-orange-200 p-4">
                        <h2 className="font-medium">Auto Sizing</h2>
                        <p>
                            This item uses <code>size="auto"</code> and adjusts its width based on
                            its content.
                        </p>
                    </div>
                </Grid>

                {/* Grow Functionality */}
                <Grid item size="grow" className="bg-teal-200 p-4">
                    <h2 className="font-medium">Grow</h2>
                    <p>
                        The <code>grow</code> property lets this item expand to fill any
                        remaining space.
                    </p>
                </Grid>
            </Grid>

            <div>
                <h2 className="text-2xl font-bold mb-4">Spacing Variations</h2>
                <Grid
                    container
                    spacing="5px"
                    className="border border-dashed border-gray-300 p-4 mb-4"
                >
                    <Grid item size={10} className="bg-red-200 p-4">
                        Item 1 (spacing: 5px)
                    </Grid>
                    <Grid item size={10} className="bg-blue-200 p-4">
                        Item 2 (spacing: 5px)
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing="15px"
                    className="border border-dashed border-gray-300 p-4"
                >
                    <Grid item size={10} className="bg-green-200 p-4">
                        Item 1 (spacing: 15px)
                    </Grid>
                    <Grid item size={10} className="bg-purple-200 p-4">
                        Item 2 (spacing: 15px)
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing="50px"
                    className="border border-dashed border-gray-300 p-4"
                >
                    <Grid item size={10} className="bg-green-200 p-4">
                        Item 1 (spacing: 50px)
                    </Grid>
                    <Grid item size={10} className="bg-purple-200 p-4">
                        Item 2 (spacing: 50px)
                    </Grid>
                </Grid>
            </div>


            <div>
                <h2 className="text-2xl font-bold mb-4">Offset Variations</h2>
                <Grid
                    container
                    spacing="10px"
                    className="border border-dashed border-gray-300 p-4"
                >
                    <Grid item size={10} offset={0} className="bg-yellow-200 p-4">
                        Item 1 No Offset
                    </Grid>
                    <Grid item size={10} offset={-2} className="bg-yellow-300 p-4">
                        Item 2 Offset: -2 (20% Left & Up)
                    </Grid>
                    <Grid item size={10} offset={[0,-10]} className="bg-yellow-400 p-4">
                        Item 3 Offset: [0,-10] (100% up)
                    </Grid>
                    <Grid item size={10} offset={[-10,10]} className="bg-yellow-500 p-4">
                        Item 4 Offset: [-10,10] (100% Left & Down)
                    </Grid>
                </Grid>
            </div>
        </>
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
            <Section background="default" spacing="xl">
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

