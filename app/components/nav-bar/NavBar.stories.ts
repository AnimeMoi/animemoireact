import {Meta, StoryObj} from "@storybook/react";
import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
    title: 'Components/NavBar',
    component: NavBar,
    argTypes: {
        onSignin: { action: 'onSignin' },
        onSignup: { action: 'onSignup' }
    },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
    args: {
        isHomePage: true,
        isLoggedIn: true
    }
};
