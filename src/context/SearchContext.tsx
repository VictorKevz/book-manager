import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchContextType } from "../types/search";
import { ContextProviderProps } from "../types/book";
import { useBookFetch } from "../hooks/useBookFetch";
import { InputType } from "../types/upsertBook";
import { useLocation, useNavigate } from "react-router-dom";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: ContextProviderProps) => {
  const [query, setQuery] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { books } = useBookFetch();

  const handleQueryChange = useCallback((event: InputType) => {
    setQuery(event.target.value.toLowerCase());
  }, []);

  //   Update categories on component mount
  useEffect(() => {
    const categoryList = Array.from(
      new Set(books.map((book) => book.category))
    );
    setCategories(categoryList);
  }, [books]);

  //   Delay updating the debounced query as query changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // If user searches while is not on the books page then redirect to the books page
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      debouncedQuery.length >= 3 &&
      location.pathname !== "/dashboard/books"
    ) {
      navigate("/dashboard/books");
    }
  }, [debouncedQuery, location.pathname, navigate]);
  return (
    <SearchContext.Provider
      value={{
        query,
        categories,
        OnQueryChange: handleQueryChange,
        debouncedQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useSearchProvider = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearchProvider must be used within SearchProvider!");
  return context;
};
