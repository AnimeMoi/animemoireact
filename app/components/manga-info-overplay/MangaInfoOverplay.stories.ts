import {Meta, StoryObj} from "@storybook/react";
import MangaInfoOverplay from "./MangaInfoOverplay";
// import MangaCover1 from "../../images/demo-manga-covers/Sono-Bisque-Doll-Wa-Koi-O-Suru.jpg";

const meta: Meta<typeof MangaInfoOverplay> = {
    title: 'Components/MangaInfoOverplay',
    component: MangaInfoOverplay,
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof MangaInfoOverplay>;

export const Default: Story = {
    // args:{
    //     coverImage: MangaCover1
    // }
    args: {
        coverImage: "https://i.imgur.com/d87wbwI.jpg",
        title: "Sono Bisque Doll Wa Koi O Suru",
        author: "Shinichi Fukuda",
        status: "Đang tiến hành",
        views: "9M",
        description: "Wakana Gojou 15 tuổi là 1 học sinh cao trung từng bị tổn thương tâm lý trong quá khứ do sở thích kỳ lạ của mình. Chuyện đó đã khiến cậu trở nên nhút nhát, rụt rè. Cho tới ngày nọ Gojou tình cờ gặp Kitagawa – một Gyaru – người có tính cách trái ngược hoàn toàn với cậu ấy. 2 người họ hóa ra đều có những điểm chung và đã tạo thành một mối quan hệ hài hước."
    }
};
