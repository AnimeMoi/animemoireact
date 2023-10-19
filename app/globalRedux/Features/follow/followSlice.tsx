import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FollowSlice = {
  value: any;
};

const initialState: FollowSlice = {
  value: null,
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollow: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { setFollow } = followSlice.actions;

export default followSlice.reducer;
