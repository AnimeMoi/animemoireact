import Link from 'next/link';

type Chapters = [
    {
        title: string;
        url: string;
        view: string;
    }
];

export default async function Page({ params }: { params: { id: string } }) {
    var request = await fetch(
        `https://animemoi.onrender.com/api/NetTruyen/Chapter?url=${params.id}`
    );
    var data: Chapters = await request.json();

    return (
        <div>
            {data.map((chapter) => (
                <Link
                    key={chapter.title}
                    href={`/reader/${encodeURIComponent(chapter.url)}`}
                >
                    <h1>{chapter.title}</h1>
                </Link>
            ))}
        </div>
    );
}
