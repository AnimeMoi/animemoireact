"use client";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {AddComic} from "../../components/admin/add-comic/AddComic";
import {ButtonPrimary} from "../../components/button/button";
import {GetTotal} from "../../utils/manga";
import {DeleteComic} from "../../components/admin/delete-comic/DeleteComic";
import {DeleteChapter} from "../../components/admin/delete-chapter/DeleteChapter";
import {useGlobalContext} from "../../globalContext/store";
import {UpdateComic} from "../../components/admin/update-comic/UpdateComic";

export default function Page() {
    // Check role begin
    const [isAdmin, setIsAdmin] = useState(true);
    const {user} = useGlobalContext();
    checkRole(user, setIsAdmin);

    useEffect(() => {
        if (!isAdmin) return redirect("/");
    }, [isAdmin]);
    // Check role end

    // Get total comic
    const [totalComic, setTotalComic] = useState("Loading");
    useEffect(() => {
        const fetchData = async () => {
            let result = await GetTotal();
            setTotalComic(result.toString());
        };

        fetchData().then(() => {
        });
    }, []);
    // End get total comic

    const [addComic, setAddComic] = useState(false);
    const [deleteComic, setDeleteComic] = useState(false);
    const [updateComic, setUpdateComic] = useState(false);
    const [deleteChapter, setDeleteChapter] = useState(false);

    const handleShowComponentAddComic = () => {
        setAddComic(!addComic);
    };
    const handleShowComponentDeleteComic = () => {
        setDeleteComic(!deleteComic);
    };

    const handleShowComponentUpdateComic = () => {
        setUpdateComic(!deleteComic);
    };

    const handleShowComponentDeleteChapter = () => {
        setDeleteChapter(!deleteChapter);
    };

    return (
        <div>
            {user === null ? (
                <div>You are not an admin</div>
            ) : (
                <div className="w-screen min-h-screen flex items-center bg-richBlack flex-col gap-5">
                    <div className="text-white text-xl">{`Hello admin ${user?.displayName}`}</div>
                    <div className="text-white">
                        Tổng số truyện hiện tại: {totalComic}
                    </div>
                    <div className="flex gap-5">
                        <ButtonPrimary
                            text="Thêm truyện"
                            func={handleShowComponentAddComic}
                        ></ButtonPrimary>
                        <ButtonPrimary
                            text="Xoá truyện"
                            func={handleShowComponentDeleteComic}
                        ></ButtonPrimary>
                        <ButtonPrimary
                            text="Xoá chương"
                            func={handleShowComponentDeleteChapter}
                        ></ButtonPrimary>
                    </div>
                    {!addComic ? <></> : <AddComic/>}
                    {!deleteComic ? <></> : <DeleteComic/>}
                    {!deleteChapter ? <></> : <DeleteChapter/>}
                    {!updateComic ? <></> : <UpdateComic/>}
                </div>
            )}
        </div>
    );
}

function checkRole(user: User | null, setIsAdmin: any) {
    user?.getIdTokenResult().then((idTokenResult) => {
        if (!idTokenResult.claims.admin) {
            setIsAdmin(false);
        }
    });
}
