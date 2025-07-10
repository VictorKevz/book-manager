import { formItem, InputFieldType, MUIIconType } from "./upsertBook";

// === BASE TYPES ===
export type Theme = "light" | "dark" | "system";
export type Font = "modern" | "code" | "classic";
export type Language = "en" | "fi";

// === MAIN TABS ===
export type TabKey = "account" | "preference" | "password";

// === INDIVIDUAL PREFERENCE KEYS ===
export type PreferenceKey = "theme" | "font" | "language";

// === PREFERENCE DATA TYPE ===
export type PreferenceDataType = {
  title: string;
  description: string;
  type: PreferenceKey;
  data: TabDataType[];
  selected: string;
};
// === GENERIC VALUE TYPE ===
export type TabValue = Theme | Font | Language;

// === DROPDOWN/DISPLAY DATA ===
export type TabDataType = {
  value: TabValue;
  label: string;
  icon: MUIIconType | string;
  description: string;
};

// === UI COPY FOR TABS ===
export type TabsHeadingData = {
  [key in TabKey]: {
    title: string;
    description: string;
  };
};

// === CONTEXT ===
export interface ThemeContextType {
  theme: Theme;
  onThemeUpdate: (theme: Theme) => void;
}

// === FONT FAMILY MAPPING ===
export const fontMap: Record<Font, string> = {
  modern: '"Roboto", sans-serif',
  code: '"Space Mono", monospace',
  classic: '"Crimson Text", serif',
};

// === PREFERENCE TAB ===
export type PreferenceTabProps = {
  theme: Theme;
  font: Font;
  language: Language;
  onUpdate: (value: TabValue, key: PreferenceKey) => void;
  onReset: () => void;
};

// === PROFILE ===
export type Profile = {
  id: string;
  full_name: string;
  email: string;
  bio: string;
  phone: string;
  country: string;
  avatar_url: string | File;
  created_at: string;
  updated_at: string;
};

// === FORM ===
export type AccountFormProps = {
  data: ProfileForm;
  onRefresh: () => void;
};
export type ProfileForm = Pick<
  Profile,
  "full_name" | "bio" | "email" | "phone" | "country" | "avatar_url"
>;

export type ProfileFormField = Omit<formItem, "value" | "type"> & {
  value: string;
  type: InputFieldType;
};

export const InitialProfileForm: ProfileForm = {
  full_name: "",
  bio: "",
  email: "",
  phone: "",
  country: "",
  avatar_url: "",
};
export type ProfileFormValid = {
  [key in keyof ProfileForm]: boolean;
};
export const ProfileFormValidInitial: ProfileFormValid = {
  full_name: true,
  email: true,
  bio: true,
  phone: true,
  country: true,
  avatar_url: true,
};
