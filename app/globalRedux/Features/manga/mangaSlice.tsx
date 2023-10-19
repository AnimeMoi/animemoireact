import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MangaState = {
  data: any;
};

const initialState: MangaState = {
  data: null,
};

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    setMangaData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setMangaData } = mangaSlice.actions;

export default mangaSlice.reducer;
