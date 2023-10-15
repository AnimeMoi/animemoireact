"use client";
import React, { useState, useEffect } from "react";
import "../../globals.css";
import "./GenreOverlay.css";
import AnimeMoiGenre from "../../public/assets/genre-types/AnimeMoi/tags.json";

const GenreOverlay: React.FC = () => {
  const [genres, setGenres] = useState<any>([]);

  useEffect(() => {
    setGenres(AnimeMoiGenre);
  }, []);

  return (
    <div className="genre-wrapper bg-richBlack/60 backdrop-blur-[10px] rounded-3xl border-[1.5px] border-white/20 text-sm text-white/75 font-medium p-5">
      <div className="h-[422px] grid gap-x-[45px] gap-y-5 grid-cols-5 overflow-y-auto no-scrollbar">
        {genres.map((genre: any) => (
          <div
            key={genre.Id}
            className="genre-name"
            data-description={genre.Description}
          >
            {genre.Name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreOverlay;
