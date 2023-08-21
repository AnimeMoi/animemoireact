import {Meta, StoryObj} from "storybook/react";
import ReportManga from "./ReportManga";

const meta: Meta<typeof ReportManga> = {
    title: 'Components/ReportManga',
    component: ReportManga,
    argTypes: {
        onSend: {action: 'onSend'},
        onClose: {action: 'onClose'}
    },
};

export default meta;
type Story = StoryObj<typeof ReportManga>;

export const Default: Story = {};
