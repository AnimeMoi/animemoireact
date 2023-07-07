import Image from 'next/image';
import Link from 'next/link';

type Mangas = {
    numberManga: number;
    mangas: [
        {
            id: number;
            title: [
                {
                    id: number;
                    title: string;
                }
            ];
            url: string;
            cover: string;
            author: string;
            description: string;
            genreMangas: {
                id: number;
            };
        }
    ];
};

export const Domain = 'http://animemoi.somee.com/api/';

export default async function Home() {
    var request = await fetch(`${Domain}NetTruyen`);
    var data: Mangas = await request.json();

    return (
        <div className="grid grid-cols-5 gap-4">
            {data.mangas.map((manga) => (
                <Link key={manga.id} href={`/details/${manga.url}`}>
                    <h1>{manga.title[0].title}</h1>
                    <Image
                        src={manga.cover}
                        alt={''}
                        width={250}
                        height={200}
                    ></Image>
                </Link>
            ))}
        </div>
    );
}
