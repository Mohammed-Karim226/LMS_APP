import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@/features/counter/counterSlice";
import companionSlice from "@/features/counter/companionSlice";

// Configure and export the store as a constant
export const store = configureStore({
  reducer: { counter: counterSlice, companion: companionSlice },
  // No need to specify middleware unless you want to customize it
});

// Define the types for your store, state, and dispatch
export type AppStore = typeof store;
export type TRootState = ReturnType<AppStore["getState"]>;
export type TAppDispatch = AppStore["dispatch"];
