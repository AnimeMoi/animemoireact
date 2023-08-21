import {Meta} from "storybook/react";
import NewMangaUpdate from "./NewMangaUpdate";

const meta: Meta<typeof NewMangaUpdate> = {
    title: 'Components/NewMangaUpdate',
    component: await NewMangaUpdate,
    argTypes: {}
};

export default meta;
type Story = typeof NewMangaUpdate;

export const Default: Story = {};
