import {Meta, StoryObj} from "storybook/react";
import MangaInfoOverplay from "./MangaInfoOverplay";

const meta: Meta<typeof MangaInfoOverplay> = {
    title: 'Components/MangaInfoOverplay',
    component: MangaInfoOverplay,
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof MangaInfoOverplay>;

export const Default: Story = {
    args: {
        // coverImage: require("../../images/demo-manga-covers/shingeki-no-kyojin.jpg"),
        coverImage: "https://honeysanime.com/wp-content/uploads/2017/12/Boruto-Naruto-Next-Generations-500x750.jpg",
        title: "Uzumaki Boruto",
        author: "Ikemoto Mikio - Kishimoto Masashi - Kodachi Ukyou",
        status: "Đang tiến hành",
        views: 5661179,
        description: "Boruto là phần tiếp nối của siêu phẩm Naruto huyền thoại. Trong phần này, truyện tập trung vào cậu bé Boruto, con trai của Naruto. Truyện mở đầu bằng cảnh làng lá hoang tàn và một nhân vật bí ẩn tuyên bố về cái chết của Naruto cùng sự chấm dứt của thời đại Ninja hoàng kim. Chuyện gì đã xảy ra? Số phận của các nhân vật như Naruto, Sasuke… ra sao? Và vì sao Boruto lại đeo băng đô với biểu tượng làng lá bị cắt ngang?"
    }
};
