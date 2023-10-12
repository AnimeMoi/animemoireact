"use client";
import { useState } from "react";
import { Domain } from "../../../domain";
import auth from "../../auth/Firebase";
import { ButtonPrimary } from "../../button/Button";

export const DeleteComic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteComic = async () => {
    setIsLoading(true);
    const idComicToDelte = document.getElementById(
      "idComic"
    ) as HTMLInputElement | null;
    console.log(`Click: handle delete ${idComicToDelte?.value}`);

    const token = await auth.currentUser?.getIdToken();

    const request = await fetch(
      `${Domain}Admin/DeleteComic?idComic=${idComicToDelte?.value}`,
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
        <label htmlFor="idComic">Id comic: </label>
        <input className="text-black" type="text" name="idComic" id="idComic" />
      </div>
      <div className="w-[50px] m-auto pt-5 pb-5">
        <ButtonPrimary text={"Xoá"} func={handleDeleteComic} />
      </div>
      <div className="text-red-500">
        {isLoading === true ? "Loading" : error}
      </div>
    </div>
  );
};
