import { supabase } from "../hooks/useBookFetch";

export const uploadFileToStorage = async (
  file: File,
  userId: string
): Promise<string | null> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error } = await supabase.storage
    .from("book-covers")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("book-covers").getPublicUrl(filePath);
  return data.publicUrl;
};

export const extractImagePath = (url: string): string => {
  const bucket = "book-covers/";
  const index = url.indexOf(bucket);
  if (index === -1) return "";

  const pathWithUser = url.slice(index + bucket.length);
  return decodeURIComponent(pathWithUser);
};
