import { MUIIconType } from "./upsertBook";

export type TabType = {
  id: string;
  icon: MUIIconType;
  label: string;
  description: string;
};

export type Theme = "light" | "dark" | "system";
export interface ThemeContextType {
  theme: Theme;
  onThemeUpdate: (theme: Theme) => void;
}
