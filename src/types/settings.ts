import { MUIIconType } from "./upsertBook";
export type Theme = "light" | "dark" | "system";
export type Font = "modern" | "code" | "classic";
export type Language = "en" | "fi";
export type TabKey = "color" | "font" | "language" | "account";

export type SettingsTabKey = Exclude<TabKey, "account">;
export type TabValue = Theme | Font | Language;

export type SettingsTabProps = {
  data: TabDataType[];
  selectedValue: TabValue;
  onUpdate: (value: TabValue) => void;
  title: string;
  description: string;
  onReset: () => void;
  activeTab: TabKey;
};

export type TabsHeadingData = {
  [key in TabKey]: {
    title: string;
    description: string;
  };
};
export type TabDataType = {
  value: Theme | Font | Language;
  label: string;
  icon: MUIIconType | string;
  description: string;
};

export interface ThemeContextType {
  theme: Theme;
  onThemeUpdate: (theme: Theme) => void;
}
