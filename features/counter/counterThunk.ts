import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCounter = createAsyncThunk(
  "counter/fetchCounter",
  async (args: string, { rejectWithValue }) => {
    try {
      const res = await fetch("https://api.example.com/counter");
      const data = await res.json();
      return data;
    } catch (error) {
      const errr = error as { message: string };
      return rejectWithValue({ error: errr.message });
    }
  }
);
