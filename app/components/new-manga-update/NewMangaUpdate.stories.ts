import {Meta, StoryObj} from "@storybook/react";
import NewMangaUpdate from "./NewMangaUpdate";

const meta: Meta<typeof NewMangaUpdate> = {
    title: 'Components/NewMangaUpdate',
    component: NewMangaUpdate
};

export default meta;
type Story = StoryObj<typeof NewMangaUpdate>;

export const Default: Story = {};
