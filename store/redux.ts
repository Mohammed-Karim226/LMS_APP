import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@/features/counter/counterSlice";

// Configure and export the store as a constant
export const store = configureStore({
  reducer: { counter: counterSlice }, // Add your reducers here
});

// Define the types for your store, state, and dispatch
export type AppStore = typeof store;
export type TRootState = ReturnType<AppStore["getState"]>;
export type TAppDispatch = AppStore["dispatch"];
