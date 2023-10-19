import { configureStore } from "@reduxjs/toolkit";
import mangasReducer from "./Features/mangas/mangasSlice";
import mangaReducer from "./Features/manga/mangaSlice";
import sourceReducer from "./Features/source/sourceSlice";
import followReducer from "./Features/follow/followSlice";

const store = configureStore({
  reducer: {
    mangas: mangasReducer,
    manga: mangaReducer,
    source: sourceReducer,
    follow: followReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
