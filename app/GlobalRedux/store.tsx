"use client";
import {configureStore} from '@reduxjs/toolkit'
import comicReducer from "./Features/comics/comicSlice";
import sourceReducer from "./Features/source/sourceSlice";

export const store = configureStore({
    reducer: {
        comics: comicReducer,
        source: sourceReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch