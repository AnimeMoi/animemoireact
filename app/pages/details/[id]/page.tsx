import Link from 'next/link';
import { Domain } from '@/app/pages/NetTruyen/page';
import { Chapters } from '@/app/types/App';

export default async function Page({ params }: { params: { id: string } }) {
    var request = await fetch(`${Domain}NetTruyen/Chapter?url=${params.id}`);
    var data: Chapters = await request.json();

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
