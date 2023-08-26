import Image from "next/image";
import AnyaSorry from "./images/anya-spy-x-family-apologize.gif";
import NavBar from "./components/nav-bar/NavBar";
import NewMangaUpdate from "./components/new-manga-update/NewMangaUpdate";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-richBlack">
      <div className="hidden w-[1200px] h-full tablet:flex flex-col justify-start items-center gap-[60px] px-[48px] pb-[48px]">
        <NavBar isHomePage={true} />
        <NewMangaUpdate />
      </div>
      <div className="font-primary tablet:hidden w-full h-full flex flex-col justify-center items-center gap-[30px]">
        <div className="w-[198px] h-[198px] relative overflow-hidden">
          <Image
            src={AnyaSorry}
            alt={""}
            fill
            objectFit="cover"
            className="rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]"
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
};
