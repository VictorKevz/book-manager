import {
  Category,
  ImportantDevices,
  MovieFilter,
  Museum,
  Science,
  SelfImprovement,
} from "@mui/icons-material";
import { MUIIconType } from "./types/upsertBook";

export const categoryIcons: Record<string, MUIIconType> = {
  All: Category as MUIIconType,
  Science: Science as MUIIconType,
  "Self-Help": SelfImprovement as MUIIconType,
  Technology: ImportantDevices as MUIIconType,
  Fiction: MovieFilter as MUIIconType,
  History: Museum as MUIIconType,
};
