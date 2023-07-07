import Image from 'next/image';
import { Domain } from '@/app/pages/NetTruyen/page';

export default async function Page({ params }: { params: { id: string } }) {
    var request = await fetch(
        `${Domain}NetTruyen/ChapterDetail?url=${params.id}`
    );
    var data: [] = await request.json();

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
