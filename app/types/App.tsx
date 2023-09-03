export type Mangas = {
    numberManga: number;
    mangas: [
        {
            id: number;
            title: [
                {
                    id: number;
                    title: string;
                }
            ];
            url: string;
            cover: string;
            author: string;
            description: string;
            genreMangas: {
                id: number;
            };
        }
    ];
};

export type Chapters = [
    {
        id: number;
        title: string;
        url: string;
        view: string;
    }
];
