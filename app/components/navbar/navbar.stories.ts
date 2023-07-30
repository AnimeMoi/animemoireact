import {NavBar} from "./navbar";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof NavBar> = {
    title: "Components/Navbar",
    component: NavBar
}

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
    args: {
        isLogin: false,
        homeIcon: false
    }
}

export const Logged: Story = {
    args: {
        isLogin: true,
        homeIcon: false
    }
}

export const DefaultWithHomeIcon: Story = {
    args: {
        isLogin: false,
        homeIcon: true
    }
}

export const LoggedWithHomeIcon: Story = {
    args: {
        isLogin: true,
        homeIcon: true
    }
}