import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SourceState = {
  selectedSource: string;
};

const initialState: SourceState = {
  selectedSource: "NetTruyen",
};

export const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    onSelectSource: (state, action: PayloadAction<string>) => {
      state.selectedSource = action.payload;
    },
  },
});

export const { onSelectSource } = sourceSlice.actions;

export default sourceSlice.reducer;
