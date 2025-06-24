import React, { useCallback, useState } from "react";
import { BookItem, EmptyBookItem, InitialValidItem } from "../types/book";
import { onChangeType, PreviewUrlType } from "../types/createBook";
import { supabase } from "./useBookFetch";
import { uploadFileToStorage } from "../utils/storage";

export const useBookForm = (bookToEdit?: BookItem) => {
  const [form, setForm] = useState<BookItem>(bookToEdit ?? EmptyBookItem);
  const [formValid, setFormValid] = useState(InitialValidItem);
  const [previewUrl, setPreviewUrl] = useState<PreviewUrlType>(null);

  const handleTextChange = useCallback((event: onChangeType) => {
    const { value, name } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormValid((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setForm((prev) => ({ ...prev, image_url: file }));
        setFormValid((prev) => ({ ...prev, image_url: true }));
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    },
    []
  );
  const clearFileUploader = useCallback(() => {
    setPreviewUrl(null);
  }, []);

  const handleValidation = () => {
    const newFormValid = { ...formValid };

    Object.entries(form).forEach(([key, value]) => {
      const trimmedValue = value.toString().trim();

      // 1. Check for empty fields
      if (!trimmedValue) {
        newFormValid[key as keyof typeof newFormValid] = false;
        return;
      }

      // 2. Field-specific validation
      if (["price", "quantity"].includes(key)) {
        const regex = /^\d+(\.\d{1,2})?$/;
        const isValidNumber = regex.test(trimmedValue);
        newFormValid[key as keyof typeof newFormValid] = isValidNumber;
        return;
      }

      // 3. validate the image field
      if (key === "image_url") {
        if (!(value instanceof File)) {
          newFormValid.image_url = false;
          return;
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        newFormValid.image_url = allowedTypes.includes(value.type);
        return;
      }
      // Default to true if value exists and passes above checks
      newFormValid[key as keyof typeof newFormValid] = true;
    });

    setFormValid(newFormValid);

    // Return overall validity
    return Object.values(newFormValid).every(Boolean);
  };
  // Upload file to Supabase Storage and return public URL or path

  const clearForm = () => {
    setForm(EmptyBookItem);
    setFormValid(InitialValidItem);
    setPreviewUrl(null);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = handleValidation();
    if (!isValid) {
      alert("Error occurred");
      return;
    }
    let imageUrl = "";
    if (form.image_url && form.image_url instanceof File) {
      const uploadedUrl = await uploadFileToStorage(form.image_url);
      if (!uploadedUrl) {
        alert("Failed to upload image");
        return;
      }
      imageUrl = uploadedUrl;
    }
    const finalData = { ...form, image_url: imageUrl };
    const { error } = await supabase
      .from("books_inventory")
      .insert([finalData]);
    if (error) {
      alert(error.message);
    }
    alert("New Book Created!");
    clearForm();
  };
  return {
    handleFileChange,
    handleTextChange,
    handleSubmit,
    form,
    formValid,
    clearForm,
    previewUrl,
    clearFileUploader,
  };
};
