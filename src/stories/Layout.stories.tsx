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
            <Grid item className="page-container">
                <section className="section">
                    <h1 className="section-title">Grid Component Test</h1>

                    {/* Basic Grid */}
                    <h2 className="section-title">Basic Grid (2 columns)</h2>
                    <Grid container spacing={20} className="demo-container">
                        <Grid item size={10} >
                            <Grid item className="bg-blue-light p-4">
                                Item 1 (size 10)
                            </Grid>
                        </Grid>
                        <Grid item size={10}>
                            <Grid item className="bg-blue-light p-4">
                                Item 2 (size 10)
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Nested Grid */}
                    <h2 className="section-title">Nested Grid</h2>
                    <Grid container spacing={10} className="demo-container">
                        <Grid item size={20}>
                            <Grid container spacing={10} className="demo-container">
                                <Grid item nested size={10}>
                                    <Grid item className="bg-purple-light p-4">
                                        Nested Item 1
                                    </Grid>
                                </Grid>
                                <Grid item nested size={5}>
                                    <Grid item className="bg-purple-light p-4">
                                        Nested Item 2
                                    </Grid>
                                </Grid>
                                <Grid item nested size={5}>
                                    <Grid item className="bg-purple-light p-4">
                                        Nested Item 3
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item size={20}>
                            <Grid item className="bg-blue-light p-4">
                                Regular Item
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Different Sizes */}
                    <h2 className="section-title">Different Sizes</h2>
                    <Grid container spacing={2} className="demo-container">
                        <Grid item size={5}>
                            <Grid item className="bg-red-light p-4">
                                Size 5
                            </Grid>
                        </Grid>
                        <Grid item size={10}>
                            <Grid item className="bg-green-light p-4">
                                Size 10
                            </Grid>
                        </Grid>
                        <Grid item size={5}>
                            <Grid item className="bg-red-light p-4">
                                Size 5
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Spacing Variations */}
                    <h2 className="section-title">Spacing Variations</h2>
                    <Grid item className="demo-container">
                        <Grid container spacing={5}>
                            <Grid item size={10}>
                                <Grid item className="bg-red-light p-4">
                                    Item 1 (spacing: 5px)
                                </Grid>
                            </Grid>
                            <Grid item size={10}>
                                <Grid item className="bg-blue-light p-4">
                                    Item 2 (spacing: 5px)
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item className="demo-container">
                        <Grid container spacing={15}>
                            <Grid item size={10}>
                                <Grid item className="bg-green-light p-4">
                                    Item 1 (spacing: 15px)
                                </Grid>
                            </Grid>
                            <Grid item size={10}>
                                <Grid item className="bg-purple-light p-4">
                                    Item 2 (spacing: 15px)
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item className="demo-container">
                        <Grid container spacing={50}>
                            <Grid item size={10}>
                                <Grid item className="bg-green-light p-4">
                                    Item 1 (spacing: 50px)
                                </Grid>
                            </Grid>
                            <Grid item size={10}>
                                <Grid item className="bg-purple-light p-4">
                                    Item 2 (spacing: 50px)
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item className="demo-container">
                        <Grid container spacing={[5,0]}>
                            <Grid item size={10}>
                                <Grid item className="bg-red-light p-4">
                                    Item 1 (spacing: [5,0]px)
                                </Grid>
                            </Grid>
                            <Grid item size={10}>
                                <Grid item className="bg-blue-light p-4">
                                    Item 2 (spacing: [5,0]px)
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className="demo-container">
                        <Grid container spacing={[50,5]}>
                            <Grid item size={10}>
                                <Grid item className="bg-red-light p-4">
                                    Item 1 (spacing: [50,5]px)
                                </Grid>
                            </Grid>
                            <Grid item size={10}>
                                <Grid item className="bg-blue-light p-4">
                                    Item 2 (spacing: [50,5]px)
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Offset Variations */}
                    <h2 className="section-title">Offset Variations</h2>
                    <Grid container spacing={50} className="demo-container">
                        <Grid item size={5} offset={0}>
                            <Grid item className="bg-yellow-1 p-4">
                                Item 1 No Offset
                            </Grid>
                        </Grid>
                        <Grid item size={5} offset={-2}>
                            <Grid item className="bg-yellow-2 p-4">
                                Item 2 Offset: -2
                            </Grid>
                        </Grid>
                        <Grid item size={5} offset={[0,-10]}>
                            <Grid item className="bg-yellow-3 p-4">
                                Item 3 Offset: [0,-10]
                            </Grid>
                        </Grid>
                        <Grid item size={5} offset={[-10,10]}>
                            <Grid item className="bg-yellow-4 p-4">
                                Item 4 Offset: [-10,10]
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Growing and Shrinking */}
                    <h2 className="section-title">Growing and Shrinking</h2>
                    <Grid container className="demo-container">
                        <Grid item size="auto">
                            <Grid item className="bg-purple-light p-4">
                                Auto
                            </Grid>
                        </Grid>
                        <Grid item size="grow">
                            <Grid item className="bg-teal-light p-4">
                                Grow
                            </Grid>
                        </Grid>
                        <Grid item size="shrink">
                            <Grid item className="bg-orange-light p-4">
                                Shrink
                            </Grid>
                        </Grid>
                    </Grid>
                </section>
            </Grid>
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
            <Section spacing="lg">
                Default Section
            </Section>
            <Section spacing="xl">
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

