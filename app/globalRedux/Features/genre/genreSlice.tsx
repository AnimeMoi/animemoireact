import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type SourceState = {
    selectedGenres: number[] | null;
};

const initialState: SourceState = {
    selectedGenres: null,
};

export const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        setSelectedGenre: (state, action: PayloadAction<number[] | null>) => {
            state.selectedGenres = action.payload;
        },
    },
});

export const {setSelectedGenre} = genresSlice.actions;

export default genresSlice.reducer;
