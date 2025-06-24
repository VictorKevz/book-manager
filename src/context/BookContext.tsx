/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { BookContextType, ContextProviderProps } from "../types/book";
import { useBookFetch } from "../hooks/useBookFetch";

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);

export const BookProvider = ({ children }: ContextProviderProps) => {
  const { books, uiState } = useBookFetch();

  return (
    <BookContext.Provider value={{ books, uiState }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookProvider = () => {
  const context = useContext(BookContext);
  if (!context)
    throw new Error("useBookProvider must be used within BookProvider!");
  return context;
};
