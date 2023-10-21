"use client";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Domain } from "../../../domain";
import auth from "../../auth/Firebase";
import { ButtonPrimary } from "../../button/button";

/*
link doc Listbox: https://headlessui.com/
*/
import genres from "../../../public/assets/genre-types/AnimeMoi/tags.json";

const NSFW = [
  { id: 1, value: "False" },
  { id: 2, value: "True" },
];

export const AddComic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedNSFW, setSelectedNSFW] = useState({ id: 1, value: "False" });
  const [result, setResult] = useState("");

  const handleAddComic = async () => {
    const nsfw = selectedNSFW.value !== "False";
    const newComic = {
      host: "AnimeMoi",
      titles: [title],
      description,
      cover: "string",
      author,
      status: 2, // 2 = continue
      nsfw,
      genres: selectedGenres.map((e: any) => e.id),
    };

    const token = await auth.currentUser?.getIdToken();

    await fetch(`${Domain}Admin/CreateComic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newComic),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.id) {
          setResult(`Thêm mới truyện thành công với id là ${result.id}`);
        } else {
          setResult(`Đã xảy ra lỗi trong quá trình thêm mới truyện!`);
        }
      })
      .catch((e) => console.error(e));
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setCover("");
    setSelectedGenres([]);
    setSelectedNSFW({ id: 1, value: "False" });
    setResult("");
  };

  return (
    <div className="w-[420px] h-fit flex flex-col gap-[25px] p-5 rounded-[16px] bg-[#0f0f0f] border-[1px] border-white/[.07]">
      <div className="flex flex-row justify-between items-center">
        <label
          htmlFor="titleComic"
          className="text-sm text-white/75 font-medium"
        >
          Tên truyện
        </label>
        <input
          className="text-sm text-lightGray font-medium placeholder:text-sm placeholder:text-lightGray placeholder:font-medium w-[260px] h-[46px] rounded-[14px] outline-none p-4 bg-transparent border-[1px] border-white/[.07]"
          type="text"
          id="titleComic"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[25px]">
        <label htmlFor="" className="text-sm text-white/75 font-medium">
          Mô tả
        </label>
        <textarea
          className="text-sm text-lightGray font-medium placeholder:text-sm placeholder:text-lightGray placeholder:font-medium w-full rounded-[14px] outline-none p-[14px] bg-transparent border-[1px] border-white/[.07]"
          id=""
          rows={4}
          placeholder=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="" className="text-sm text-white/75 font-medium">
          Ảnh cover
        </label>
        <input
          className="text-sm text-lightGray font-medium placeholder:text-sm placeholder:text-lightGray placeholder:font-medium w-[260px] h-[46px] rounded-[14px] outline-none p-[14px] bg-transparent border-[1px] border-white/[.07]"
          type="text"
          placeholder=""
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="" className="text-sm text-white/75 font-medium">
          Tác giả
        </label>
        <input
          className="text-sm text-lightGray font-medium w-[260px] h-[46px] rounded-[14px] outline-none p-[14px] bg-transparent border-[1px] border-white/[.07]"
          type="text"
          placeholder=""
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="" className="text-sm text-white/75 font-medium">
          NSFW
        </label>
        <div className="w-[260px] h-[46px] rounded-[14px] outline-none p-[14px] bg-transparent border-[1px] border-white/[.07] relative">
          <Listbox value={selectedNSFW} onChange={setSelectedNSFW}>
            <Listbox.Button className="text-sm text-white/75 font-medium w-full h-full flex flex-row justify-between items-center cursor-pointer">
              {selectedNSFW.value}
              <CaretDown weight="bold" size={16} className="text-white/75" />
            </Listbox.Button>
            <Listbox.Options className="absolute top-[140%] right-0 w-full h-fit flex flex-col gap-[14px] bg-[#0f0f0f]/80 backdrop-blur-[10px] border-[1px] border-white/[.07] rounded-[16px] p-4 z-[200]">
              {NSFW.map((nsfw) => (
                <Listbox.Option
                  key={nsfw.id}
                  value={nsfw}
                  className="text-sm text-lightGray hover:text-[#d9f21c] font-medium cursor-pointer"
                >
                  {nsfw.value}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="" className="text-sm text-white/75 font-medium">
          Thể loại
        </label>
        <div className="w-[260px] h-fit rounded-[14px] outline-none p-[14px] bg-transparent border-[1px] border-white/[.07] relative">
          <Listbox value={selectedGenres} onChange={setSelectedGenres} multiple>
            <Listbox.Button className="w-full h-full flex items-center">
              {selectedGenres.length === 0 ? (
                <div className="w-full h-full flex flex-row justify-between items-center">
                  <p className="text-sm text-white/75 font-medium">
                    Chọn thể loại
                  </p>
                  <CaretDown
                    weight="bold"
                    size={16}
                    className="text-white/75"
                  />
                </div>
              ) : (
                <div className="text-sm text-lightGray font-medium w-full h-full flex items-center overflow-y-scroll no-scrollbar">
                  {selectedGenres
                    .map((genres: any) => genres["Name"])
                    .join(", ")}
                </div>
              )}
            </Listbox.Button>
            <Listbox.Options className="absolute top-[140%] right-0 w-full h-[156px] flex flex-col gap-[14px] bg-[#0f0f0f]/80 backdrop-blur-[10px] border-[1px] border-white/[.07] rounded-[16px] p-4 z-[200] overflow-y-scroll no-scrollbar">
              {genres.map((genre) => (
                <Listbox.Option
                  key={genre.id}
                  value={genre}
                  className="text-sm text-lightGray hover:text-[#d9f21c] font-medium cursor-pointer"
                >
                  {genre["Name"]}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <div className="text-sm text-white/75 font-medium ">{result}</div>
      <div className="flex flex-row gap-[25px] justify-end items-center pt-[15px]">
        <p
          className="text-[13px] text-white/75 font-semibold cursor-pointer scale-in"
          onClick={handleCancel}
        >
          Huỷ
        </p>
        <ButtonPrimary text="Thêm truyện" func={handleAddComic}></ButtonPrimary>
      </div>
    </div>
  );
};
