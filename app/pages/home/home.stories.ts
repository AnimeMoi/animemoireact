import {Meta, StoryObj} from "@storybook/react";
import HomePage from "../../page";

const meta: Meta<typeof HomePage> = {
    title: 'Pages/HomePage',
    component: HomePage
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
