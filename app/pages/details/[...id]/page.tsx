import Link from 'next/link';

import {Chapters} from '@/app/types/App';

import {Domain} from "@/app/domain";

export default async function Page({params}: { params: { id: [string, string] } }) {
    console.log(params)
    const request = await fetch(`${Domain}${params.id[1]}/Chapter?url=${params.id[0]}`);
    const data: Chapters = await request.json();

    return (
        <div>
            {data.map((chapter) => (
                <Link
                    key={chapter.title}
                    href={`/pages/reader/${encodeURIComponent(chapter.url)}/${params.id[1]}`}
                >
                    <h1>{chapter.title}</h1>
                </Link>
            ))}
        </div>
    );
}
