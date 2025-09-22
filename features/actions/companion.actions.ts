"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCompanionThunk = createAsyncThunk(
  "companion/createCompanionThunk",
  async ({ formData }: { formData: CreateCompanion }, { rejectWithValue }) => {
    const { userId: author } = await auth();
    if (!author) {
      return rejectWithValue({ error: "User not authenticated" });
    }
    const supabase = await createSupabaseClient();

    try {
      let iconUrl: string | undefined;
      if (formData.icon) {
        const fileName = `${author}/${Date.now()}_${formData.icon.name}`;
        const { error: uploadError } = await supabase.storage
          .from("companion-icons")
          .upload(fileName, formData.icon);

        if (uploadError) {
          throw new Error(`Failed to upload icon: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from("companion-icons")
          .getPublicUrl(fileName);
        iconUrl = publicUrlData.publicUrl;
      }

      const { data, error } = await supabase
        .from("companions")
        .insert({
          icon: iconUrl,
          name: formData.name,
          subject: formData.subject,
          topic: formData.topic,
          voiceType: formData.voiceType,
          speakingStyle: formData.speakingStyle,
          language: formData.language,
          duration: formData.duration,
          author,
        })
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
