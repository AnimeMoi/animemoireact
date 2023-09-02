import {Meta, StoryObj} from "@storybook/react";
import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
    title: 'Components/NavBar',
    component: NavBar,
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
    args: {
        isHomePage: true
    }
};
