import {Meta, StoryObj} from "@storybook/react";
import SignInOverlay from "./SignInOverlay";

const meta: Meta<typeof SignInOverlay> = {
    title: 'Components/SignInOverlay',
    component: SignInOverlay,
    argTypes: {
        onEmailSignIn: { action: 'onEmailSignIn' },
        onAuthStateChanged: { action: 'onAuthStateChanged' }
    },
};

export default meta;
type Story = StoryObj<typeof SignInOverlay>;

export const Default: Story = {};
