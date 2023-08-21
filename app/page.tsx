"use client"
// @ts-ignore
import NewMangaUpdate from "@/app/components/new-manga-update/NewMangaUpdate";
import NavBar from "@/app/components/nav-bar/NavBar";
import auth from "@/app/components/auth/Firebase";
import {onAuthStateChanged} from "@firebase/auth";
import {useState} from "react";

export default function Home() {
    let [isLogin, setIsLogin] = useState(false)

    const _auth = auth

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    })

    return (
        <>
            <NavBar isLogin={isLogin} isHomePage={true}></NavBar>
            <NewMangaUpdate></NewMangaUpdate>
        </>
    )
}
