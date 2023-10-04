// export type Mangas = {
//   numberManga: number;
//   mangas: [
//     {
//       id: number;
//       title: [
//         {
//           id: number;
//           title: string;
//         },
//       ];
//       url: string;
//       cover: string;
//       author: string;
//       description: string;
//       genreMangas: {
//         id: number;
//       };
//     },
//   ];
// };

export type Chapter = {
	id: number;
	title: string;
	timeUpdate: string;
	views: number;
};

export type Chapters = Chapter[];
