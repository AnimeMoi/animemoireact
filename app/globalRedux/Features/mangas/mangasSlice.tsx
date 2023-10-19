import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MangasState = {
  data: any[];
};

const initialState: MangasState = {
  data: [],
};

export const mangasSlice = createSlice({
  name: "mangas",
  initialState,
  reducers: {
    setMangasData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setMangasData } = mangasSlice.actions;

export default mangasSlice.reducer;
