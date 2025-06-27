/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BookContextType,
  BookItem,
  BookMeta,
  ContextProviderProps,
  EmptyBookItem,
} from "../types/book";
import { supabase, useBookFetch } from "../hooks/useBookFetch";
import { extractImagePath } from "../utils/extractImage";
import { useAlertProvider } from "./AlertContext";

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
  const { onShowAlert } = useAlertProvider();

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
    // 1. Immediately show loading state once user confirms deletion
    turnOnLoader();

    // 2. Send DELETE request to supabase with id of the book to be deleted.
    const { error } = await supabase
      .from("books_inventory")
      .delete()
      .eq("id", bookToDelete?.id);

    // 3. If there's an error shown an alert and stop the loader
    if (error) {
      onShowAlert({
        message: error.message,
        type: "error",
        visible: true,
      });
      turnOffLoader();
      return;
    }

    // 4. Since book covers/images are stored in the supabase storage we need to also send a DELETE request
    // 4.1 To delete the image we need to grab the file path - hence the usage of the helper available in utils > extractImage
    const imagePath = extractImagePath(bookToDelete?.image_url as string);
    const { error: imageError } = await supabase.storage
      .from("book-covers")
      .remove([imagePath]);

    // 5 In case of an error while deleting the image, I show an alert and update the UI state
    if (imageError) {
      onShowAlert({
        message: imageError.message,
        type: "error",
        visible: true,
      });
      handleError(imageError.message);
      return;
    }

    // 6. Finally show a success alert confirming deletion.
    // 6.1 Refresh the UI by fetching the new data using "refreshBooks();"
    // 6.2 Reset states relevant states
    onShowAlert({
      message: "Book successfully deleted!",
      type: "success",
      visible: true,
    });
    refreshBooks();
    setWarningModal(false);
    setBookToDelete(EmptyBookItem);
    turnOffLoader();
  }, [
    bookToDelete?.id,
    bookToDelete?.image_url,
    handleError,
    onShowAlert,
    refreshBooks,
    turnOffLoader,
    turnOnLoader,
  ]);

  // A websocket responsible for listenting to real-time DB changes and updates the UI
  useEffect(() => {
    const subscription = supabase
      .channel("books-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "books_inventory",
        },
        (payload) => {
          console.log("Change received!", payload);

          refreshBooks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [refreshBooks]);
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
