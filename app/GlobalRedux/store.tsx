"use client";
import {configureStore} from '@reduxjs/toolkit'
import comicReducer from "./Features/comics/comicSlice";

export const store = configureStore({
    reducer: {
        comics: comicReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch