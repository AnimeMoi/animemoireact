import {configureStore} from "@reduxjs/toolkit";
import {
  configReducer,
  followReducer,
  genresReducer,
  mangaReducer,
  mangasReducer,
  pageReducer,
  sourceReducer,
} from "./Features/index";

const store = configureStore({
    reducer: {
        mangas: mangasReducer,
        manga: mangaReducer,
        source: sourceReducer,
        follow: followReducer,
        genres: genresReducer,
        page: pageReducer,
        config: configReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
