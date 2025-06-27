/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import {
  BookContextType,
  BookItem,
  BookMeta,
  ContextProviderProps,
  EmptyBookItem,
} from "../types/book";
import { supabase, useBookFetch } from "../hooks/useBookFetch";
import { extractImagePath } from "../utils/extractImage";

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);

export const BookProvider = ({ children }: ContextProviderProps) => {
  const {
    books,
    uiState,
    fetchBooks,
    turnOnLoader,
    turnOffLoader,
    handleError,
  } = useBookFetch();
  const [bookToEdit, setBookToEdit] = useState<BookItem>(EmptyBookItem);
  const [bookToDelete, setBookToDelete] = useState<BookMeta>(EmptyBookItem);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [isWarningModal, setWarningModal] = useState<boolean>(false);

  const handleEditBook = useCallback((book: BookItem) => {
    setBookToEdit(book);
    setFormOpen(true);
  }, []);

  const toggleForm = useCallback(() => {
    if (isFormOpen) {
      setFormOpen(false);
      setBookToEdit(EmptyBookItem);
      return;
    }
    setFormOpen(true);
  }, [isFormOpen]);

  const openWarningModal = useCallback((book: BookMeta) => {
    setWarningModal(true);
    setBookToDelete(book);
  }, []);

  const closeWarningModal = useCallback(() => {
    setWarningModal(false);
    setBookToDelete(EmptyBookItem);
  }, []);

  const refreshBooks = useCallback(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Handler responsible for deleting both the book and the book-cover
  const handleDeleteBook = useCallback(async () => {
    turnOnLoader();
    const { error } = await supabase
      .from("books_inventory")
      .delete()
      .eq("id", bookToDelete?.id);
    if (error) {
      console.error("Delete Failed:", error.message);
      alert("Failed to delete the book!");
      turnOffLoader();
      return;
    }

    const imagePath = extractImagePath(bookToDelete?.image_url as string);
    console.log("Deleting from storage:", imagePath);

    const { error: ImageError } = await supabase.storage
      .from("book-covers")
      .remove([imagePath]);
    if (ImageError) {
      alert("Failed to delete book cover!");
      console.error("Error", ImageError.message);
      handleError(ImageError.message);
      return;
    }

    refreshBooks();
    setWarningModal(false);
    setBookToDelete(EmptyBookItem);
    turnOffLoader();
  }, [
    bookToDelete?.id,
    bookToDelete?.image_url,
    handleError,
    refreshBooks,
    turnOffLoader,
    turnOnLoader,
  ]);

  return (
    <BookContext.Provider
      value={{
        books,
        uiState,
        bookToEdit,
        bookToDelete,
        onFormEdit: handleEditBook,
        onBookDelete: handleDeleteBook,
        onModalClose: closeWarningModal,
        onModalOpen: openWarningModal,
        isWarningModal,
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
