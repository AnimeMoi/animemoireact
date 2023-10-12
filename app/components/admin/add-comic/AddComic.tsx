"use client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ButtonPrimary } from "../../button/button";

/*
link doc Listbox: https://headlessui.com/
*/

const genres = [
	{ id: 1, name: "genre1" },
	{ id: 2, name: "genre2" },
	{ id: 3, name: "genre3" },
];

const NSFW = [
	{ id: 1, value: "False" },
	{ id: 2, value: "True" },
];

export const AddComic = () => {
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [selectedNSFW, setSelectedNSFW] = useState({ id: 1, value: "False" });

	const handleAddComic = () => {
		console.log("Creating");
	};

	return (
		<div className="text-white flex flex-col rounded-[25px] border-[1.5px] border-white/20 px-[20px] py-[15px] gap-3 w-[30%]">
			<div>
				<label htmlFor="titleComic">Tên truyện: </label>
				<input
					className="text-black"
					type="text"
					id="titleComic"
					placeholder="Tên truyện"
				/>
			</div>
			<div>
				<label htmlFor="">Mô tả: </label>
				<textarea
					className="peer block min-h-[auto] w-full rounded border-[0.5px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
					id="exampleFormControlTextarea1"
					rows={4}
					placeholder="Mô tả"
				></textarea>
			</div>
			<div>
				<label htmlFor="">Ảnh cover: </label>
				<input
					className="text-black"
					type="text"
					id=""
					placeholder="Image url"
				/>
			</div>
			<div>
				<label htmlFor="">Tác giả: </label>
				<input className="text-black" type="text" id="" placeholder="Tác giả" />
			</div>
			<div className="flex gap-1">
				<label htmlFor="">NSFW: </label>
				<div className="relative">
					<Listbox value={selectedNSFW} onChange={setSelectedNSFW}>
						<Listbox.Button>{selectedNSFW.value}</Listbox.Button>
						<Listbox.Options className="absolute">
							{NSFW.map((nsfw) => (
								<Listbox.Option key={nsfw.id} value={nsfw}>
									{nsfw.value}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Listbox>
				</div>
			</div>
			<div className="flex gap-1">
				<label htmlFor="">Thể loại: </label>
				<div className="color-white relative">
					<Listbox value={selectedGenres} onChange={setSelectedGenres} multiple>
						{selectedGenres.length === 0 && (
							<Listbox.Button>Chọn thể loại</Listbox.Button>
						)}
						<Listbox.Button>
							{selectedGenres.map((genres: any) => genres.name).join(", ")}
						</Listbox.Button>
						<Listbox.Options className="absolute">
							{genres.map((genre) => (
								<Listbox.Option
									key={genre.id}
									value={genre}
									className="cursor-pointer"
								>
									{genre.name}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Listbox>
				</div>
			</div>
			<div className="flex justify-center">
				<ButtonPrimary text="Thêm truyện" func={handleAddComic}></ButtonPrimary>
			</div>
		</div>
	);
};
