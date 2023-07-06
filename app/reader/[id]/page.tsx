import Image from 'next/image';

export default async function Page({ params }: { params: { id: string } }) {
    var request = await fetch(
        `https://animemoi.onrender.com/api/NetTruyen/ChapterDetail?url=${params.id}`
    );
    var data: [] = await request.json();

    return (
        <div>
            {data.map((chapter) => (
                <Image
                    key={chapter}
                    src={`https://animemoi.onrender.com/api/NetTruyen/GetImage?url=https:${chapter}`}
                    alt={''}
                    width={'1000'}
                    height={'1000'}
                ></Image>
            ))}
        </div>
    );
}
