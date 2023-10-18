"use client";

import {createSlice} from "@reduxjs/toolkit";

export interface comicSlice {
    data: object[];
}

const initialState: comicSlice = {
    data: []
}

export const comicSlice = createSlice({
    name: "comics",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {setData} = comicSlice.actions;

export default comicSlice.reducer;