import {
  Category,
  ImportantDevices,
  MovieFilter,
  Museum,
  Science,
  SelfImprovement,
} from "@mui/icons-material";
import { MUIIconType } from "../types/upsertBook";
import { DropdownOption } from "../types/search";

export const categoryData: DropdownOption[] = [
  { type: "category", label: "All", icon: Category as MUIIconType },
  { type: "category", label: "Science", icon: Science as MUIIconType },
  {
    type: "category",
    label: "Self-Help",
    icon: SelfImprovement as MUIIconType,
  },
  {
    type: "category",
    label: "Technology",
    icon: ImportantDevices as MUIIconType,
  },
  { type: "category", label: "Fiction", icon: MovieFilter as MUIIconType },
  { type: "category", label: "History", icon: Museum as MUIIconType },
];

export const sortByData: DropdownOption[] = [
  { type: "sort", label: "Author (A–Z)", field: "author", order: "asc" },
  { type: "sort", label: "Author (Z–A)", field: "author", order: "desc" },
  { type: "sort", label: "Title (A–Z)", field: "title", order: "asc" },
  { type: "sort", label: "Title (Z–A)", field: "title", order: "desc" },
  { type: "sort", label: "Stock: High to Low", field: "stock", order: "desc" },
  { type: "sort", label: "Stock: Low to High", field: "stock", order: "asc" },
];
