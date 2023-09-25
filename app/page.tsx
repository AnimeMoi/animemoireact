import Image from "next/image";
import Thumbnail from "./images/thumbnail.png";
import NavBar from "./components/nav-bar/NavBar";
import NewMangaUpdate from "./components/new-manga-update/NewMangaUpdate";
import { Suspense } from "react";
import Loading from "./loading";
import SourceBar from "./components/source-bar/SourceBar";
import { SourceProvider } from "./sourceContext";

export default function Home() {
  return (
    <SourceProvider>
      <div className="w-screen min-h-screen flex justify-center items-center bg-richBlack">
        <div className="hidden w-[1200px] h-full tablet:flex flex-col justify-start items-center gap-[50px] px-[40px]">
          <NavBar isHomePage={true} />
          <SourceBar />
          <Suspense fallback={<Loading />}>
            <NewMangaUpdate />
          </Suspense>
          <div className="w-full h-[50px]"></div>
          <div className="w-full h-fit flex flex-row justify-between items-center pt-[25px] py-[50px] border-t-[1.5px] border-white/[.15]">
            <div className="flex flex-col gap-[6px]">
              <p className="text-lg text-lightGray font-semibold uppercase tracking-wider">
                AnimeMoi
              </p>
              <p className="text-sm text-white/75 font-medium">
                1 sản phẩm của tdquang266 và hoang3402
              </p>
            </div>
            <p className="text-sm text-white/75 font-medium">
              © 2023 AnimeMoi. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
        <div className="tablet:hidden w-full h-full flex flex-col justify-center items-center gap-[50px]">
          <div className="w-[400px] h-[200px] relative overflow-hidden">
            <Image
              src={Thumbnail}
              alt=""
              fill
              sizes="(max-width: 390px) 100vw, (max-width: 1080px) 50vw"
              className="object-contain"
            />
          </div>
          <div className="w-[350px] flex flex-col gap-[8px] text-center">
            <p className="text-[22px] text-lightGray font-semibold">
              AnimeMoi mobile is coming
            </p>
            <p className="text-sm text-white/75 font-medium">
              In the meantime, please use the desktop site for the best
              experience
            </p>
          </div>
        </div>
      </div>
    </SourceProvider>
  );
}

/*
1. Move checkAuth function from NavBar to Firebase
2. Add a command to handle logic for the search bar (still haven't assigned the event to jump to the details page when clicking on any manga in the SearchResult component)
3. Change fetching Genre data from URL to fetch from local JSON file
4. Add text to manga status instead of displaying numbers
5. Edit the image displayed on the notification page that does not support responsive
6. Optimized the command line in some files
*/
