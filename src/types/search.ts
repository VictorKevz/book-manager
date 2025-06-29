import { InputType } from "./upsertBook";

export interface SearchContextType {
  query: string;
  categories: string[];
  OnQueryChange: (event: InputType) => void;
  debouncedQuery: string;
}
