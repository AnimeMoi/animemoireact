import AnimeMoiGenres from "../public/assets/genre-types/AnimeMoi/tags.json";

export const mapGenreIdToName = (genreId: number): string => {
  const genre = AnimeMoiGenres.find((item) => item.id == genreId);
  return genre ? genre["Name"] : `Thể loại không xác định: (${genreId})`;
};
