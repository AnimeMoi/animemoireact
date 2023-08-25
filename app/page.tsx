// @ts-ignore
import NewMangaUpdate from "./components/new-manga-update/NewMangaUpdate";
import NavBar from "./components/nav-bar/NavBar";

export default function Home() {
    return (
        <div className="w-screen flex justify-center bg-richBlack">
            <div className="w-[1200px] flex flex-col justify-start items-center gap-[60px] px-[48px] pb-[48px]">
                <NavBar isHomePage={true}></NavBar>
                <NewMangaUpdate></NewMangaUpdate>
            </div>
        </div>
    )
}
