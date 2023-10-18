"use client";

import {createSlice} from "@reduxjs/toolkit";

export interface comicSlice {
    value: string;
}

const initialState: comicSlice = {
    value: "NetTruyen"
}

export const sourceSlice = createSlice({
    name: "source",
    initialState,
    reducers: {
        setSelectedSource: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setSelectedSource} = sourceSlice.actions;

export default sourceSlice.reducer;