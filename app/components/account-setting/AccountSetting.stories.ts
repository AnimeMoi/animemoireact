import {Meta, StoryObj} from "storybook/react";
import AccountSetting from "./AccountSetting";

const meta: Meta<typeof AccountSetting> = {
    title: 'Components/AccountSetting',
    component: AccountSetting,
    argTypes: {
        onEdit: {action: 'onEdit'},
        onLogout: {action: 'onLogout'}
    },
};

export default meta;
type Story = StoryObj<typeof AccountSetting>;

export const Default: Story = {};
