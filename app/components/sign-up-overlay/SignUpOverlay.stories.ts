import {Meta, StoryObj} from "@storybook/react";
import SignUpOverlay from "./SignUpOverlay";

const meta: Meta<typeof SignUpOverlay> = {
    title: 'Components/SignUpOverlay',
    component: SignUpOverlay,
    argTypes: {
        onEmailSignUp: { action: 'onEmailSignUp' },
        onAuthStateChanged: { action: 'onAuthStateChanged' }
    },
};

export default meta;
type Story = StoryObj<typeof SignUpOverlay>;

export const Default: Story = {};
