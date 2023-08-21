import {Meta, StoryObj} from "storybook/react";
import SignInOverlay from "./SignInOverlay";

const meta: Meta<typeof SignInOverlay> = {
    title: 'Components/SignInOverlay',
    component: SignInOverlay,
    argTypes: {
        onEmailSignUp: {action: 'onEmailSignUp'},
        onGoogleSignUp: {action: 'onGoogleSignUp'},
        onXSignUp: {action: 'onXSignUp'},
        onFacebookSignUp: {action: 'onFacebookSignUp'}
    },
};

export default meta;
type Story = StoryObj<typeof SignInOverlay>;

export const Default: Story = {};
