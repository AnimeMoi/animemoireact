"use client";
import { useState } from "react";
import { Domain } from "../../../domain";
import auth from "../../auth/Firebase";
import { ButtonPrimary } from "../../button/button";

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
      className="w-[420px] h-fit flex flex-col gap-[25px] p-5 rounded-[16px] bg-[#0f0f0f] border-[1px] border-white/[.07]"
      suppressHydrationWarning
    >
      <div className="flex flex-row justify-between items-center">
        <label
          htmlFor="idChapter"
          className="text-sm text-white/75 font-medium"
        >
          ID Chapter
        </label>
        <input
          className="text-sm text-lightGray font-medium placeholder:text-sm placeholder:text-lightGray placeholder:font-medium w-[260px] h-[46px] rounded-[14px] outline-none p-4 bg-transparent border-[1px] border-white/[.07]"
          type="text"
          id="idChapter"
        />
      </div>
      <div className="text-sm text-red-500 font-medium">
        {isLoading ? "Loading" : error}
      </div>
      <div className="flex justify-end pt-[15px]">
        <ButtonPrimary
          text="Xoá chapter"
          func={handleDeleteChapter}
        ></ButtonPrimary>
      </div>
    </div>
  );
};
