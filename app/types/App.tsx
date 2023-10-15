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

export type SourceProviderProps = {
	children: React.ReactNode;
};

export type SourceContextProps = {
	selectedSource: string;
	onSelectSource: (source: string) => void;
};

export type Chapter = {
	id: number;
	title: string;
	timeUpdate: string;
	views: number;
};

export type Chapters = Chapter[];

export type NavBarProps = {
	isHomePage: boolean;
};

export type ButtonProps = {
	text: string;
	func: any;
};

export type SignUpProps = {
	onAuthStateChanged: (user: any) => void;
};

export type SignInProps = {
	onAuthStateChanged: (user: any) => void;
};

export type MangaReadProps = {
	host: string;
	params: any;
};

export type SearchResultProps = {
	results: any[];
};

export type GenreOverlayProps = {
	onGenreClick: (genreId: number) => void;
};

export type ReportMangaProps = {
	onSend: () => void;
	onClose: () => void;
};

export type MangaInfoProps = {
	cover: string;
	title: string;
	author: string;
	status: number;
	views: number;
	description: string;
};

export type MangaDetailProps = {
	host: string;
	params: any;
};

export type ChapterListProps = {
	host: string;
	params: any;
};

export type SearchParams = {
	query: string;
	page: number;
	genres: [number | null];
	exclude: [number | null];
	status: number;
	host: string;
};
