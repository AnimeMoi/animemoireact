import Image from "next/image";
import AnyaSorry from "./images/anya-spy-x-family-apologize.gif";
import NavBar from "./components/nav-bar/NavBar";
import NewMangaUpdate from "./components/new-manga-update/NewMangaUpdate";
import { Suspense } from "react";
import Loading from "./loading";
import SourceBar from "./components/source-bar/SourceBar";
import { SourceProvider } from "./sourceContext";
import Genre from "./components/genre/Genre";

export default function Home() {
  return (
    <SourceProvider>
      <div className="w-screen min-h-screen flex justify-center items-center bg-richBlack">
        <div className="hidden w-[1200px] h-full tablet:flex flex-col justify-start items-center gap-[50px] px-[40px] pb-[40px]">
          <NavBar isHomePage={true} />
          <SourceBar />
          <Suspense fallback={<Loading />}>
            <NewMangaUpdate />
          </Suspense>
          <Genre />
          <div className="w-full h-[100px]"></div>
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
1. Fixed an issue where the AccountSettingOverlay component did not automatically disappear after clicking the logout button
2. Remove Facebook login/signup and replace it with Github
3. Add SourceBar component
4. Handle the logic when clicking on any manga source on SourceBar to display the NewMangaUpdate component with the corresponding manga data
5. Add Genre component
6. Handle the logic when clicking on the genre button on NavBar will scroll to the Genre component in the home page
7. Corrected the logic in the NewMangaUpdate component to help fetch data from many different manga sources
8. Rewrite some other small pieces of code
*/
