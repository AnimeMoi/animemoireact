import Link from "next/link";
import {Domain} from "../../../domain";
import {Chapters} from "../../../types/App";

export default async function Page(params: any) {
    const request = await fetch(`${Domain}${params.params.host}/Chapter?url=${params.searchParams.id}`);
    const data: Chapters = await request.json();

    return (
        <>
            <button>
                <Link href={`/pages/home/${params.params.host}`}>Back</Link>
            </button>
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
        </>
    );
}
