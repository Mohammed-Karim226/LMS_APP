import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICompanion[] = [];

const companionSlice = createSlice({
  name: "companion",
  initialState,
  reducers: {
    setCompanion: (state, action: PayloadAction<ICompanion[]>) => {
      return [...action.payload];
    },
  },
});

export const { setCompanion } = companionSlice.actions;
export default companionSlice.reducer;
