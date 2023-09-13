import React from "react";
import "../../globals.css"
import Image from "next/image";
import {Domain} from "../../domain";

type MangaDetailProps = {
    host: string;
    params: any; // Truyền biến params qua props
};

const MangaDetail: ({host, params}: MangaDetailProps) => Promise<React.JSX.Element> = async ({
                                                                                                 host,
                                                                                                 params
                                                                                             }: MangaDetailProps) => {
    let data
    try {
        const response = await fetch(
            `${Domain}${host}/Manga?url=${params.searchParams.id}`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        data = await response.json();
        console.log(data)
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <div className="w-[560px] h-fit flex flex-col gap-[30px]">
            <div className="w-full h-fit flex flex-row gap-[25px]">
                <div className="w-[160px] h-[230px] relative overflow-hidden">
                    <Image
                        src={data.cover}
                        alt=""
                        fill
                        className="object-cover rounded-[20px] outline outline-[2px] outline-white/20 outline-offset-[-2px]"
                        sizes="1200px"
                    />
                </div>
                <div className="flex flex-col grow shrink-0 basis-0 justify-between overflow-hidden py-[5px]">
                    <div className="flex flex-col gap-[10px]">
                        <p className="w-full text-lg text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                            {data.title[0].title}
                        </p>
                        <div className="flex flex-col gap-[5px]">
                            <p className="w-full text-sm text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                                Tác giả: Đang cập nhật
                            </p>
                            <p className="w-full text-sm text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                                Tình trạng: Đang tiến hành
                            </p>
                            <p className="w-full text-sm text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                                Lượt đọc: 9.714.316
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-fit flex">
                        <div className="flex px-[15px] py-[10px] rounded-full bg-success cursor-pointer">
                            <span className="text-[13px] text-white font-semibold">Theo dõi</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-[15px]">
                <p className="text-lg text-lightGray font-semibold">Nội dung</p>
                <p className="text-sm text-lightGray font-medium leading-6 p-[15px] rounded-[22px] border-[1.5px] border-white/20">
                    Wakana Gojou 15 tuổi là 1 học sinh cao trung từng bị tổn thương tâm lý
                    trong quá khứ do sở thích kỳ lạ của mình. Chuyện đó đã khiến cậu trở
                    nên nhút nhát, rụt rè. Cho tới ngày nọ Gojou tình cờ gặp Kitagawa –
                    một Gyaru – người có tính cách trái ngược hoàn toàn với cậu ấy. 2
                    người họ hóa ra đều có những điểm chung và đã tạo thành một mối quan
                    hệ hài hước.
                </p>
            </div>
        </div>
    );
};

export default MangaDetail;
