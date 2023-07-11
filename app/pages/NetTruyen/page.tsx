import Image from 'next/image';
import Link from 'next/link';

import {Mangas} from '../../types/App';
import {Domain} from "@/app/domain";

export default async function Page() {
    const request = await fetch(`${Domain}NetTruyen`, {cache: 'no-store'});
    const data: Mangas = await request.json();

    return (
        <div className="grid grid-cols-5 gap-4">
            {data.mangas.map((manga) => (
                <Link key={manga.id} href={`/pages/details/${manga.url}`}>
                    <h1>{manga.title[0].title}</h1>
                    <Image
                        src={manga.cover}
                        alt={''}
                        width={250}
                        height={200}
                        loading="lazy"
                    ></Image>
                </Link>
            ))}
        </div>
    );
}
