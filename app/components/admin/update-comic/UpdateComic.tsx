"use client";
import {useState} from "react";
import {ButtonPrimary} from "../../button/button";

export const UpdateComic = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <div
            className="text-white flex flex-col rounded-[25px] border-[1.5px] border-white/20 px-[20px] py-[15px]"
        >
            <div className="flex gap-3">
                <label htmlFor="idComic">Id comic: </label>
                <input className="text-black" type="text" name="idComic" id="idComic"/>
            </div>
            <div className="w-[50px] m-auto pt-5 pb-5">
                <ButtonPrimary
                    text={"Xoá"}
                    func={() => {
                    }}
                />
            </div>
            <div className="text-red-500">{isLoading ? "Loading" : error}</div>
        </div>
    );
};
