// "use server";

// import { createSupabaseClient } from "@/lib/supabase";
// import { auth } from "@clerk/nextjs/server";

// export async function createCompanion(formData: CreateCompanion) {
//   const { userId: author } = await auth();
//   if (!author) {
//     throw new Error("User not authenticated");
//   }

//   const supabase = createSupabaseClient();

//   try {
//     let iconUrl: string | undefined;

//     if (formData.icon) {
//       const fileName = `${author}/${Date.now()}_${formData.icon.name}`;
//       const { error: uploadError } = await supabase.storage
//         .from("companion-icons")
//         .upload(fileName, formData.icon);

//       if (uploadError) {
//         throw new Error(`Failed to upload icon: ${uploadError.message}`);
//       }

//       const { data: publicUrlData } = supabase.storage
//         .from("companion-icons")
//         .getPublicUrl(fileName);
//       iconUrl = publicUrlData.publicUrl;
//     }

//     const { data, error } = await supabase
//       .from("companions")
//       .insert({
//         icon: iconUrl,
//         name: formData.name,
//         subject: formData.subject,
//         topic: formData.topic,
//         voiceType: formData.voiceType,
//         speakingStyle: formData.speakingStyle,
//         language: formData.language,
//         duration: formData.duration,
//         author,
//       })
//       .select();

//     if (error || !data) {
//       throw new Error(error?.message || "Failed to create a companion");
//     }

//     return { data: data[0], error: null };
//   } catch (error) {
//     const err = error as { message: string };
//     throw new Error(err.message || "Failed to create a companion");
//   }
// }

// export const GetAllCompanions = async ({
//   limit = 10,
//   page = 1,
//   subject,
//   topic,
// }: GetAllCompanions) => {
//   const supabase = createSupabaseClient();
//   let query = supabase.from("companions").select();

//   if (subject && topic) {
//     query = query
//       .ilike("subject", `%${subject}%`)
//       .or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
//   } else if (subject) {
//     query = query.ilike("subject", `%${subject}%`);
//   } else if (topic) {
//     query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
//   }

//   query = query.range((page - 1) * limit, page * limit - 1);
//   const { data: companions, error } = await query;

//   if (error || !companions) {
//     throw new Error(error?.message || "Failed to fetch companions");
//   }

//   return { companions, error: null };
// };
