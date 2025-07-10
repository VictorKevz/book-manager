import { useCallback, useEffect, useState } from "react";
import {
  AccountFormProps,
  InitialProfileForm,
  Profile,
  ProfileForm,
  ProfileFormField,
  ProfileFormValid,
  ProfileFormValidInitial,
} from "../../../types/settings";
import { FormWraper } from "../../../components/common/FormWraper";
import {
  FormEventType,
  InputType,
  onChangeType,
} from "../../../types/upsertBook";
import { InputField } from "../../../components/book-editor/InputField";
import { useAlertProvider } from "../../../context/AlertContext";
import { uploadFileToStorage } from "../../../utils/storage";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../hooks/useUserDataFetch";
import { SyncLoaderWrapper } from "../../../components/common/Loaders";

export const AccountForm = ({ data, onRefresh }: AccountFormProps) => {
  const [profile, setProfile] = useState<ProfileForm>(
    data ?? InitialProfileForm
  );
  const [profileValid, setProfileValid] = useState<ProfileFormValid>(
    ProfileFormValidInitial
  );
  const [previewUrl, setPreviewUrl] = useState<string>(
    typeof data?.avatar_url === "string" ? data.avatar_url : ""
  );
  const [isLoading, setLoading] = useState(false);
  const { onShowAlert } = useAlertProvider();
  const { user } = useAuth();

  const handleChange = useCallback((event: onChangeType) => {
    const { value, name } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setProfileValid((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);
  const handleFileChange = useCallback((event: InputType) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfile((prev) => ({ ...prev, image_url: file }));
      setProfileValid((prev) => ({ ...prev, image_url: true }));
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  }, []);
  const clearFileUploader = useCallback(() => {
    setPreviewUrl("");
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleValidation = () => {
    const newProfileValid: ProfileFormValid = { ...profileValid };

    Object.entries(profile).forEach(([key, value]) => {
      const trimmedValue = value?.toString().trim() ?? "";

      // Required fields
      if (key === "full_name" || key === "email") {
        newProfileValid[key as keyof ProfileFormValid] = !!trimmedValue;
        return;
      }

      // Optional: phone
      if (key === "phone") {
        if (!trimmedValue) {
          newProfileValid.phone = true;
          return;
        }
        const phoneRegex = /^\+?[0-9]{7,15}$/;
        newProfileValid.phone = phoneRegex.test(trimmedValue);
        return;
      }

      // Optional: bio (max 300 chars)
      if (key === "bio") {
        newProfileValid.bio = !trimmedValue || trimmedValue.length <= 300;
        return;
      }

      // Optional: avatar (can be a File or string)
      if (key === "avatar_url") {
        const avatarValue = profile.avatar_url;

        if (avatarValue instanceof File) {
          // Validate file type if new file uploaded
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          newProfileValid.avatar_url = allowedTypes.includes(avatarValue.type);
        } else {
          // If no file uploaded (string URL or empty), consider valid (optional upload)
          newProfileValid.avatar_url = true;
        }
        return;
      }

      // Optional: country — always valid even if empty
      if (key === "country") {
        newProfileValid.country = true;
        return;
      }

      // Default fallback
      newProfileValid[key as keyof ProfileFormValid] = true;
    });

    setProfileValid(newProfileValid);

    // Final result
    return Object.values(newProfileValid).every(Boolean);
  };

  const handleSubmit = useCallback(
    async (e: FormEventType) => {
      e.preventDefault();
      setLoading(true);

      const isValid = handleValidation();
      if (!isValid) {
        setLoading(false);
        onShowAlert({
          message: "Failed: Please check all fields",
          type: "error",
          visible: true,
        });
        return;
      }

      let avatarUrl = profile.avatar_url;

      // ✅ If user uploaded a new file
      if (profile.avatar_url && profile.avatar_url instanceof File) {
        const userId = user?.id;
        const uploadedUrl = await uploadFileToStorage(
          profile.avatar_url,
          userId as string,
          "profile-avatars"
        );

        if (!uploadedUrl) {
          setLoading(false);
          onShowAlert({
            message: "Failed to upload the avatar",
            type: "error",
            visible: true,
          });
          return;
        }

        avatarUrl = uploadedUrl;
      }

      const finalProfile: Omit<Profile, "id" | "created_at" | "updated_at"> = {
        full_name: profile.full_name.trim(),
        email: profile.email.trim(),
        phone: profile.phone?.trim() ?? "",
        country: profile.country?.trim() ?? "",
        bio: profile.bio?.trim() ?? "",
        avatar_url: avatarUrl ?? "",
      };

      const { error } = await supabase
        .from("profiles")
        .update({ ...finalProfile, updated_at: new Date().toISOString() })
        .eq("id", user?.id);

      if (error) {
        onShowAlert({
          message: error.message,
          type: "error",
          visible: true,
        });
        setLoading(false);
        return;
      }

      onShowAlert({
        message: "Profile updated successfully",
        type: "success",
        visible: true,
      });
      onRefresh();
      setLoading(false);
    },
    [
      handleValidation,
      profile.avatar_url,
      profile.full_name,
      profile.email,
      profile.phone,
      profile.country,
      profile.bio,
      user?.id,
      onShowAlert,
      onRefresh,
    ]
  );

  useEffect(() => {
    if (data) {
      setProfile(data);
      setPreviewUrl((data.avatar_url as string) || "");
    }
  }, [data]);
  const profileFormData: ProfileFormField[] = [
    {
      name: "full_name",
      value: profile?.full_name ?? "",
      placeholder: "Jane Doe",
      type: "text",
      isValid: profileValid.full_name,
      label: "Full Name",
      errorMessage: "Your name is required",
    },
    {
      name: "email",
      value: profile?.email ?? "",
      placeholder: "janedoe@example.com",
      type: "text",
      isValid: profileValid.email,
      label: "Your Email",
      errorMessage: "Your email address is required",
    },
    {
      name: "phone",
      value: profile?.phone ?? "",
      placeholder: "+358 123 4567",
      type: "text",
      isValid: profileValid.phone,
      label: "Phone Number",
      errorMessage: "",
    },

    {
      name: "country",
      value: profile?.country ?? "",
      placeholder: "Finland",
      type: "text",
      isValid: profileValid.country,
      label: "Country",
      errorMessage: "",
    },
    {
      name: "bio",
      value: profile?.bio ?? "",
      placeholder: "Hi, I am ....",
      type: "textarea",
      isValid: profileValid.bio,
      label: "Bio",
      errorMessage: "",
    },
    {
      name: "avatar",
      value: "",
      placeholder: "",
      type: "file",
      isValid: profileValid.avatar_url,
      label: "Your Avatar",
      errorMessage: "",
    },
  ];
  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <div className="w-full flex items-center justify-center mx-auto">
      <FormWraper
        title="Update Your Information"
        description="Easily create an account by filling all out all fields correctly"
        maxWidth="max-w-2xl"
        onSubmit={handleSubmit}
      >
        <fieldset className="grid grid-cols-2 w-full gap-5 mt-5 px-4">
          {profileFormData.map((field) => (
            <InputField
              key={field.name}
              field={field}
              onTextChange={handleChange}
              onFileChange={handleFileChange}
              previewUrl={previewUrl}
              onFileRemove={clearFileUploader}
              id="accountForm"
            />
          ))}
        </fieldset>
        <div className="w-full flex items-center justify-between gap-6 mt-4 bg-[var(--neutral-400)] border-t p-5 border-[var(--neutral-100)] rounded-b-2xl">
          <button
            type="button"
            className="max-w-40 w-full h-10 justify-center rounded-xl px-4 border border-[var(--primary-color)] text-[var(--neutral-900)]"
            // onClick={clearForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="max-w-40 w-full h-10 justify-center rounded-xl px-4 bg-[var(--primary-color)] text-[var(--neutral-900)]"
          >
            Update Changes
          </button>
        </div>
      </FormWraper>
    </div>
  );
};
