import {Domain} from "@/app/domain";
import {Chapters} from "@/app/types/App";
import Link from "next/link";

export default async function Page(params: any) {
    const request = await fetch(`${Domain}${params.params.host}/Chapter?url=${params.searchParams.id}`);
    const data: Chapters = await request.json();

    return (
        <div>
            {data.map((chapter) => (
                <Link
                    key={chapter.title}
                    href={`/pages/reader/${params.params.host}?id=${encodeURIComponent(chapter.url)}`}
                >
                    <h1>{chapter.title}</h1>
                </Link>
            ))}
        </div>
    );
}
