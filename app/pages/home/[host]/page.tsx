import Image from 'next/image';
import Link from 'next/link';

import {Mangas} from '@/app/types/App';
import {Domain} from "@/app/domain";

interface PageProps {
    params: {
        host: string
    }
}

export default async function Page({params}: PageProps) {
    const request = await fetch(`${Domain}${params.host}`, {
        next: {
            revalidate: 60
        }
    });
    const data: Mangas = await request.json();

    return (
        <div className="grid grid-cols-5 gap-4">
            {data.mangas.map((manga) => (
                <Link key={manga.id} href={`/pages/details/${params.host}?id=${manga.url}`}>
                    <h1>{manga.title[0].title}</h1>
                    <Image
                        src={manga.cover}
                        alt={''}
                        width={250}
                        loading="lazy"
                    ></Image>
                </Link>
            ))}
        </div>
    );
}
