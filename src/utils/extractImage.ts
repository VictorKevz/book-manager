export const extractImagePath = (url: string): string => {
  const bucket = "book-covers/";
  const index = url.indexOf(bucket);
  if (index === -1) return "";

  const encodedPath = url.slice(index + bucket.length);
  return decodeURIComponent(encodedPath);
};
