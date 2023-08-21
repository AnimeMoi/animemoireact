// @ts-ignore
import NewMangaUpdate from "./components/new-manga-update/NewMangaUpdate";
import NavBar from "./components/nav-bar/NavBar";
import auth from "./components/auth/Firebase";
import {onAuthStateChanged} from "firebase/auth";

export default function Home() {
    let isLogin = false;

    const _auth = auth

    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLogin = true;
        } else {
            isLogin = false;
        }
    })

    return (
        <div className="w-screen flex justify-center bg-richBlack">
            <div className="w-[1200px] flex flex-col justify-start items-center gap-[60px] px-[48px] pb-[48px]">
                <NavBar isLogin={isLogin} isHomePage={true}></NavBar>
                <NewMangaUpdate></NewMangaUpdate>
            </div>
        </div>
    )
}
