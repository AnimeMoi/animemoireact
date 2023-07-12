import Image from 'next/image';


import {Domain} from "@/app/domain";

export default async function Page({params}: { params: { id: [string, string] } }) {
    const response = await fetch(
        `${Domain}${decodeURIComponent(params.id[1])}/ChapterDetail?url=${params.id[0]}`
    );
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        console.error(`Yêu cầu gặp lỗi tới ${Domain}${params.id[1]}/ChapterDetail?url=${params.id[0]}:`, response.status, response.statusText);
    }

    return (
        <div>
            {data.map((chapter: any) => (
                <Image
                    key={chapter}
                    src={`${Domain}${params.id[1]}/GetImage?url=${chapter}`}
                    alt={''}
                    width={'1000'}
                    height={'1000'}
                ></Image>
            ))}
        </div>
    );
}
