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
        <h2 className="text-2xl font-bold mb-4">
            CSS Grid Layout (Numeric Sizes & Offset)
        </h2>
        <Grid
            container
            // Simulate CSS grid behavior with a responsive column count.
            direction="row"
            rowSpacing={10}
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
            <Grid container item size={{xs: 20, md: 10}} offset={[5,0]} className="bg-gray-100 p-4 mt-4" spacing="10px">
                <Grid item size={20} className="bg-purple-200 p-4">
                    Nested Item 1
                </Grid>
                <Grid item size={20} className="bg-purple-300 p-4">
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
    </>
);

export const SpacingVariations: StoryFn<GridProps> = () => (
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
    </div>
);

export const OffsetVariations: StoryFn<GridProps> = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Offset Variations</h2>
        <Grid
            container
            spacing="10px"
            className="border border-dashed border-gray-300 p-4"
        >
            <Grid item size={10} offset={0} className="bg-yellow-200 p-4">
                No Offset
            </Grid>
            <Grid item size={10} offset={2} className="bg-yellow-300 p-4">
                Offset: 2 (20% right & down)
            </Grid>
            <Grid item size={10} offset={[2, 0]} className="bg-yellow-400 p-4">
                Offset: [2, 0] (20% right)
            </Grid>
            <Grid item size={10} offset={[0, 3]} className="bg-yellow-500 p-4">
                Offset: [0, 3] (30% down)
            </Grid>
        </Grid>
    </div>
);

export const SizeVariations: StoryFn<GridProps> = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Size Variations</h2>
        <Grid
            container
            spacing="10px"
            className="border border-dashed border-gray-300 p-4"
        >
            <Grid item size={10} className="bg-blue-200 p-4">
                Size: 10 (Half row)
            </Grid>
            <Grid item size={5} className="bg-blue-300 p-4">
                Size: 5 (Quarter row)
            </Grid>
            <Grid item size={20} className="bg-blue-400 p-4">
                Size: 20 (Full row)
            </Grid>
        </Grid>
    </div>
);
