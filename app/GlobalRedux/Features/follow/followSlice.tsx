"use client";

import {createSlice} from "@reduxjs/toolkit";

export interface followSlice {
    value: any | null;
}

const initialState: followSlice = {
    value: null
}

export const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        setFollow: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setFollow} = followSlice.actions;

export default followSlice.reducer;