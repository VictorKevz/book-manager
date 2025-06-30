import {
  Category,
  ImportantDevices,
  MovieFilter,
  Museum,
  Science,
  SelfImprovement,
} from "@mui/icons-material";
import { MUIIconType } from "../types/upsertBook";
import { SortDataType } from "../types/search";

export const categoryIcons: Record<string, MUIIconType> = {
  All: Category as MUIIconType,
  Science: Science as MUIIconType,
  "Self-Help": SelfImprovement as MUIIconType,
  Technology: ImportantDevices as MUIIconType,
  Fiction: MovieFilter as MUIIconType,
  History: Museum as MUIIconType,
};

export const sortByData: SortDataType[] = [
  { label: "Author (A–Z)", field: "author", order: "asc" },
  { label: "Author (Z–A)", field: "author", order: "desc" },
  { label: "Title (A–Z)", field: "title", order: "asc" },
  { label: "Title (Z–A)", field: "title", order: "desc" },
  { label: "Stock: High to Low", field: "stock", order: "desc" },
  { label: "Stock: Low to High", field: "stock", order: "asc" },
];
