import Image from "next/image";

import Link from "next/link";
import { DomainGetImage } from "../../../domain";

export default async function Page(params: any) {
	const response = await fetch(
		`${Domain}${params.params.host}/ChapterDetail?url=${params.searchParams.id}`
	);
	const data = await response.json();

	return (
		<>
			<button>
				<Link href={`/`}>Back</Link>
			</button>
			<div className={"flex flex-col items-center"}>
				{data.map((chapter: any) => (
					<Image
						key={chapter}
						src={`${DomainGetImage}${params.params.host}/GetImage?url=${chapter}`}
						alt={""}
						width={"1000"}
						height={"1000"}
					></Image>
				))}
			</div>
		</>
	);
}
