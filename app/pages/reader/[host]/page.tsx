import Image from "next/image";
import Link from "next/link";
import {Domain, DomainGetImage} from "../../../domain";

export default async function Page(params: any) {
  const response = await fetch(
    `${Domain}${params.params.host}/ChapterDetail?url=${params.searchParams.id}`
  );
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    if (data[i].includes("ntcdntemp"))
      data[i] = `${DomainGetImage}${params.params.host}/GetImage?url=${data[i]}`
  }

  return (
    <>
      <button>
        <Link href={`/`}>Back</Link>
      </button>
      <div className={"flex flex-col items-center"}>
        {data.map((chapter: any) => (
          <Image
            key={chapter}
            src={chapter}
            alt={""}
            width={"600"}
            height={"800"}
          />
        ))}
      </div>
    </>
  );
}
