import Image from "next/image";

import {Domain} from "@/app/domain";

export default async function Page(params: any) {
    const response = await fetch(
        `${Domain}${params.params.host}/ChapterDetail?url=${params.searchParams.id}`
    );
    const data = await response.json();

    return (
        <div>
            {data.map((chapter: any) => (
                <Image
                    key={chapter}
                    src={`${Domain}${params.params.host}/GetImage?url=${chapter}`}
                    alt={''}
                    width={'1000'}
                    height={'1000'}
                ></Image>
            ))}
        </div>
    );
}
