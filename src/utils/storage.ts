import { supabase } from "../hooks/useBookFetch";

export const uploadFileToStorage = async (
  file: File
): Promise<string | null> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `books/${fileName}`;

  const { error } = await supabase.storage
    .from("book-covers")
    .upload(filePath, file);
  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("book-covers").getPublicUrl(filePath);
  return data.publicUrl;
};
