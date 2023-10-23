import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Config } from "../../../types/App";
import { getConfig, saveConfig } from "../../../utils/localStored";

const initialState: Config = getConfig();

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setNSFW: (state, action: PayloadAction<boolean>) => {
      state.nsfw = action.payload;
      saveConfig(state);
    },
  },
});

export const { setNSFW } = configSlice.actions;

export default configSlice.reducer;
