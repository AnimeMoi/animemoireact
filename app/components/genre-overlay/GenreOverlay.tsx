"use client";
import React, { useState, useEffect } from "react";
import "../../globals.css";
import "./GenreOverlay.css";
// import { useSourceContext } from "../../sourceContext";
import NetTruyenGenre from "../../genre-types/NetTruyen/tags.json";

const GenreOverlay: React.FC = () => {
  const [genres, setGenres] = useState<any>([]);

  /*
  const { selectedSource } = useSourceContext(); // Sử dụng React Context

  // Kiểm tra xem selectedSource có bằng "NetTruyen" hay không
  // Nếu có, giá trị của actualSelectedSource sẽ là "Nettruyen", ngược lại, nó sẽ giữ giá trị của selectedSource ban đầu
  const actualSelectedSource =
    selectedSource === "NetTruyen" ? "Nettruyen" : selectedSource;
  */

  /*
  useEffect(() => {
    // Thực hiện lấy dữ liệu từ URL JSON
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/hoang3402/extensions-vn/main/src/${actualSelectedSource}/tags.json`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [actualSelectedSource]);
  */

  useEffect(() => {
    setGenres(NetTruyenGenre);
  });

  /*
  // Kiểm tra xem actualSelectedSource có bằng "Nettruyen" hay không
  // Nếu actualSelectedSource bằng "Nettruyen", shouldShowGenre sẽ có giá trị true, ngược lại, nó sẽ có giá trị false
  const shouldShowGenre = actualSelectedSource === "Nettruyen";
  */

  return (
    /*
    <>
      {shouldShowGenre && (
        <div className="genre grid gap-x-[40px] gap-y-5 grid-cols-6 p-5 bg-richBlack/60 backdrop-blur-[10px] rounded-3xl border-[1.5px] border-white/20 text-sm text-white/75 font-medium">
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
      )}
    </>
    */
    <div className="genre grid gap-x-[40px] gap-y-5 grid-cols-6 p-5 bg-richBlack/60 backdrop-blur-[10px] rounded-3xl border-[1.5px] border-white/20 text-sm text-white/75 font-medium">
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
  );
};

export default GenreOverlay;
