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
}
