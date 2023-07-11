import Image from 'next/image';


import {Domain} from "@/app/domain";

export default async function Page({params}: { params: { id: [string, string] } }) {
    const request = await fetch(
        `${Domain}${params.id[1]}/ChapterDetail?url=${params.id[0]}`
    );
    const data: [] = await request.json();

    return (
        <div>
            {data.map((chapter) => (
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
