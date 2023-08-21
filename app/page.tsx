"use client"
// @ts-ignore
import NewMangaUpdate from "@/app/components/new-manga-update/NewMangaUpdate";
import NavBar from "@/app/components/nav-bar/NavBar";
import {useState} from "react";
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "@firebase/auth";
import auth from "@/app/components/auth/Firebase";

export default function Home() {
    let [isLogin, setIsLogin] = useState(false)

    const provider = new GoogleAuthProvider()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    })

    function loginHandler() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential?.accessToken
                // The signed-in user info.
                const user = result.user
                console.log(`Đăng nhập ${user.displayName} thành công!`)
                setIsLogin(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function logout() {
        auth.signOut().then(() => {
            console.log("Logout success")
        }).catch((e) => {
            console.error(e)
        })
    }

    return (
        <>
            <NavBar isLoggedIn={isLogin} isHomePage={true} handleClickOnAvatar={logout}></NavBar>
            <NewMangaUpdate></NewMangaUpdate>
        </>
    )
}
