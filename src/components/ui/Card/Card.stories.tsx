import { Meta, StoryFn } from "@storybook/react";
import Card, { CardProps } from "./Card.tsx";

export default {
    title: "Components/Card",
    component: Card,
    argTypes: {
        title: { control: "text" },
        className: { control: "text" },
    },
} as Meta<CardProps>;

const Template: StoryFn<CardProps> = (args: CardProps) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: "Card Title",
    children: "This is a simple card component.",
};

export const WithContent = Template.bind({});
WithContent.args = {
    title: "Card with Content",
    children: (
        <div>
            <p>This card includes more detailed content.</p>
            <ul className="list-disc pl-5">
                <li>Item one</li>
                <li>Item two</li>
                <li>Item three</li>
            </ul>
        </div>
    ),
};
