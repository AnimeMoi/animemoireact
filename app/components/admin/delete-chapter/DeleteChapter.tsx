"use client";
import {useState} from "react";
import {Domain} from "../../../domain";
import auth from "../../auth/Firebase";
import {ButtonPrimary} from "../../button/button";

export const DeleteChapter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDeleteChapter = async () => {
        setIsLoading(true);
        const idChapterToDelete = document.getElementById(
            "idChapter"
        ) as HTMLInputElement | null;
        console.log(`Click: handle delete ${idChapterToDelete?.value}`);

        const token = await auth.currentUser?.getIdToken();

        const request = await fetch(
            `${Domain}Admin/DeleteChapter?idChapter=${idChapterToDelete?.value}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((result) => result.json());

        setIsLoading(false);
        setError(request.message);
    };

    return (
        <div
            className="text-white flex flex-col rounded-[25px] border-[1.5px] border-white/20 px-[20px] py-[15px]"
            suppressHydrationWarning
        >
            <div className="flex gap-3">
                <label htmlFor="idChapter">Id chapter: </label>
                <input
                    className="text-black"
                    type="text"
                    name="idChapter"
                    id="idChapter"
                />
            </div>
            <div className="w-[50px] m-auto pt-5 pb-5">
                <ButtonPrimary text={"Xoá"} func={handleDeleteChapter}/>
            </div>
            <div className="text-red-500">
                {isLoading ? "Loading" : error}
            </div>
        </div>
    );
};
