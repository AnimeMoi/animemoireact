import Image from "next/image";
import AnyaSorry from "../../../images/anya-spy-x-family-apologize.gif";
import NavBar from "../../../components/nav-bar/NavBar";
import MangaDetail from "../../../components/manga-detail/MangaDetail";
import ChapterList from "../../../components/chapter-list/ChapterList";

export default async function Page(params: any) {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-richBlack">
      <div className="hidden w-[1200px] h-full tablet:flex flex-col justify-start items-center gap-[50px] px-[40px] pb-[40px]">
        <NavBar isHomePage={false} />
        <MangaDetail host={params.params.host} params={params} />
        <ChapterList host={params.params.host} params={params} />
        <div className="w-full h-[160px]"></div>
      </div>
      <div className="tablet:hidden w-full h-full flex flex-col justify-center items-center gap-[30px]">
        <div className="w-[198px] h-[198px] relative overflow-hidden">
          <Image
            src={AnyaSorry}
            alt=""
            fill
            sizes="(max-width: 390px) 100vw, (max-width: 1080px) 50vw"
            className="object-cover rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]"
          />
        </div>
        <div className="w-[260px] flex flex-col gap-[8px] text-center">
          <p className="text-[22px] text-lightGray font-semibold">
            AnimeMoi mobile is coming
          </p>
          <p className="text-sm text-white/75 font-medium">
            In the meantime, please use the desktop site for the best experience
          </p>
        </div>
      </div>
    </div>
  );
}
