import { createSlice } from "@reduxjs/toolkit";

const initialState: CreateCompanion = {
  icon: undefined,
  name: "",
  subject: "",
  topic: "",
  voiceType: "male",
  speakingStyle: "formal",
  language: "",
  duration: 0,
};
const companionSlice = createSlice({
  name: "companion",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = companionSlice.actions;
export default companionSlice.reducer;
