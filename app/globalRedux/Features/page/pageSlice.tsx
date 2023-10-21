import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type PageState = {
    value: number;
};

const initialState: PageState = {
    value: 1,
};

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const {setCurrentPage} = pageSlice.actions;

export default pageSlice.reducer;
