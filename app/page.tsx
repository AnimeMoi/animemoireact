// @ts-ignore
import NewMangaUpdate from "@/app/components/new-manga-update/NewMangaUpdate";
import NavBar from "@/app/components/nav-bar/NavBar";
import auth from "@/app/components/auth/Firebase";
import {onAuthStateChanged} from "@firebase/auth";

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
        <>
            <NavBar isLogin={isLogin} isHomePage={true}></NavBar>
            <NewMangaUpdate></NewMangaUpdate>
        </>
    )
}
