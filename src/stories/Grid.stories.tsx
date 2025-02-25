import {Meta, StoryFn} from "@storybook/react";
import type {GridProps} from "../components";
import {Grid} from "../components";


export default {
    title: "Layout/Grid",
    component: Grid,
    tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export const CompleteGrid: StoryFn<GridProps> = () => (
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
                    <Grid item size="auto">
                        <Grid item className="bg-orange-light p-4">
                            Shrink
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
);

export const SpacingVariations: StoryFn<GridProps> = () => (
    <div>
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
            <Grid container spacing={25}>
                <Grid item size={10}>
                    <Grid item className="bg-green-light p-4">
                        Item 1 (spacing: 25px)
                    </Grid>
                </Grid>
                <Grid item size={10}>
                    <Grid item className="bg-purple-light p-4">
                        Item 2 (spacing: 25px)
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
            <Grid container spacing={[45,5]}>
                <Grid item size={10}>
                    <Grid item className="bg-red-light p-4">
                        Item 1 (spacing: [25,5]px)
                    </Grid>
                </Grid>
                <Grid item size={10}>
                    <Grid item className="bg-blue-light p-4">
                        Item 2 (spacing: [25,5]px)
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    </div>
);

export const OffsetVariations: StoryFn<GridProps> = () => (
    <div>
        <h2 className="section-title">Offset Variations</h2>
        <Grid container spacing={10} className="demo-container">
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
            <Grid item size={5} offset={[-10,5]}>
                <Grid item className="bg-yellow-4 p-4">
                    Item 4 Offset: [-10,5]
                </Grid>
            </Grid>
        </Grid>
    </div>
);

export const SizeVariations: StoryFn<GridProps> = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Size Variations</h2>
        <Grid
            container
            className="border border-dashed border-gray-300 p-4"
        >
            <Grid item size={10} className="bg-blue-200 p-4">
                Size: 10 (Half row)
            </Grid>
            <Grid item size={10} className="bg-blue-300 p-4">
                Size: 5 (Quarter row)
            </Grid>
            <Grid item size={20} className="bg-blue-400 p-4">
                Size: 20 (Full row)
            </Grid>
        </Grid>
    </div>
);
