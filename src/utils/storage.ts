import { supabase } from "../hooks/useUserDataFetch";

export const uploadFileToStorage = async (
  file: File,
  userId: string,
  folder: string = "profile-avatars"
): Promise<string | null> => {
  if (!userId) {
    alert("uploadFileToStorage: Missing userId");
    return null;
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error } = await supabase.storage.from(folder).upload(filePath, file, {
    upsert: true,
  });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from(folder).getPublicUrl(filePath);
  if (!data) {
    console.error("Upload returned no data");
    return null;
  }
  console.log("Upload success:", data);

  return data.publicUrl;
};

export const extractImagePath = (
  url: string,
  destination: string = "book-covers"
): string => {
  const bucket = `${destination}/`;
  const index = url.indexOf(bucket);
  if (index === -1) return "";

  const pathWithUser = url.slice(index + bucket.length);
  return decodeURIComponent(pathWithUser);
};
