"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const createCompanionThunk = createAsyncThunk(
  "companion/createCompanionThunk",
  async ({ formData }: { formData: CreateCompanion }, { rejectWithValue }) => {
    const { userId: author } = await auth();
    const supabase = await createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from("companions")
        .insert({ ...formData, author })
        .select();
      if (error || !data) {
        throw new Error(error?.message || "Failed to create a companion");
      }
      return data[0];
    } catch (error) {
      const err = error as { message: string };
      return rejectWithValue({ error: err?.message });
    }
  }
);
