import Image from 'next/image';


import {Domain} from "@/app/domain";

export default async function Page({ params }: { params: { id: string } }) {
    const request = await fetch(
        `${Domain}NetTruyen/ChapterDetail?url=${params.id}`
    );
    const data: [] = await request.json();

    return (
        <div>
            {data.map((chapter) => (
                <Image
                    key={chapter}
                    src={`${Domain}NetTruyen/GetImage?url=${chapter}`}
                    alt={''}
                    width={'1000'}
                    height={'1000'}
                ></Image>
            ))}
        </div>
    );
}
