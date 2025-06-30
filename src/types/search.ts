import { InputType, MUIIconType } from "./upsertBook";
export type CategoryDataType = {
  name: string;
  icon: MUIIconType;
};
export interface SearchContextType {
  query: string;
  categoryList: string[];
  categoryData: CategoryDataType[];
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

export type DropDownProps = {
  onSortUpdate: (option: SortOption, label: string) => void;
  data: SortDataType[];
  sortLabel: string;
};

export type PaginateItemsProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
};
