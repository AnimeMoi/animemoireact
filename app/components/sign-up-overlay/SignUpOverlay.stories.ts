import {Meta, StoryObj} from "@storybook/react";
import SignUpOverlay from "./SignUpOverlay";

const meta: Meta<typeof SignUpOverlay> = {
    title: 'Components/SignUpOverlay',
    component: SignUpOverlay,
    argTypes: {
        onEmailSignUp: { action: 'onEmailSignUp' },
        onGoogleSignUp: { action: 'onGoogleSignUp' },
        onXSignUp: { action: 'onXSignUp' },
        onFacebookSignUp: { action: 'onFacebookSignUp' }
    },
};

export default meta;
type Story = StoryObj<typeof SignUpOverlay>;

export const Default: Story = {};
