import Link from 'next/link';

import {Chapters} from '@/app/types/App';

import {Domain} from "@/app/domain";

export default async function Page({params}: { params: { id: string } }) {
    const request = await fetch(`${Domain}NetTruyen/Chapter?url=${params.id}`);
    const data: Chapters = await request.json();

    return (
        <div>
            {data.map((chapter) => (
                <Link
                    key={chapter.title}
                    href={`/pages/reader/${encodeURIComponent(chapter.url)}`}
                >
                    <h1>{chapter.title}</h1>
                </Link>
            ))}
        </div>
    );
}
