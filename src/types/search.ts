import { InputType, MUIIconType } from "./upsertBook";
export type CategoryDataType = {
  name: string;
  icon: MUIIconType;
};
export interface SearchContextType {
  query: string;
  OnQueryChange: (event: InputType) => void;
  debouncedQuery: string;
  onClearQuery: () => void;
}
export type SortOption = {
  field: "title" | "author" | "stock";
  order: "asc" | "desc";
};

export type SortDataType = SortOption & {
  label: string;
};

export type DropdownOption =
  | {
      type: "category";
      label: string;
      icon: MUIIconType;
    }
  | {
      type: "sort";
      label: string;
      field: "title" | "author" | "stock";
      order: "asc" | "desc";
    };
export type DropDownProps = {
  data: DropdownOption[];
  onOptionUpdate: (option: DropdownOption, label: string) => void;
  currentLabel: string;
};

export type PaginateItemsProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
};

export type CategoryData = {
  label: string;
  icon: MUIIconType;
};
