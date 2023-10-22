import React, {Dispatch, SetStateAction} from "react";
import {User} from "firebase/auth";

export type Chapter = {
    id: number;
    idComic: string;
    title: string;
    timeUpdate: string;
    views: number;
    chapNumber: number;
};

export type Chapters = Chapter[];

export type NavBarProps = {
    isHomePage: boolean;
    isGenres: boolean;
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

export type SearchParams = {
    query: string;
    page: number;
    genres: number[];
    exclude: number[];
    status: number;
    host: string;
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

export type GlobalProviderProps = {
    children: React.ReactNode;
};

export type GlobalContextProps = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};

export type Config = {
    nsfw: boolean;
}