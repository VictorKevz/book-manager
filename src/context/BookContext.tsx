/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import {
  BookContextType,
  BookItem,
  ContextProviderProps,
  EmptyBookItem,
} from "../types/book";
import { useBookFetch } from "../hooks/useBookFetch";

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);

export const BookProvider = ({ children }: ContextProviderProps) => {
  const { books, setBooks, uiState, fetchBooks } = useBookFetch();
  const [bookToEdit, setBookToEdit] = useState<BookItem>(EmptyBookItem);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);

  const handleEditBook = useCallback(
    (book: BookItem) => {
      setBookToEdit(book);
      setFormOpen(!isFormOpen);
    },
    [isFormOpen]
  );

  const toggleForm = useCallback(() => {
    if (isFormOpen) {
      setFormOpen(false);
      setBookToEdit(EmptyBookItem);
      return;
    }
    setFormOpen(true);
  }, [isFormOpen]);

  const handleDeleteBook = (title: string) => {
    // temporarily remove book in FE
    setBooks((prevBooks) => prevBooks.filter((book) => book.title != title));
  };

  const refreshBooks = useCallback(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <BookContext.Provider
      value={{
        books,
        uiState,
        bookToEdit,
        onFormEdit: handleEditBook,
        onBookDelete: handleDeleteBook,
        isFormOpen,
        toggleForm,
        refreshBooks,
      }}
    >
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
