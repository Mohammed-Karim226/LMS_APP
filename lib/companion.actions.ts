"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function createCompanion(formData: CreateCompanion) {
  const { userId: author } = await auth();
  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createSupabaseClient();

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

    return { data: data[0], error: null };
  } catch (error) {
    const err = error as { message: string };
    throw new Error(err.message || "Failed to create a companion");
  }
}
