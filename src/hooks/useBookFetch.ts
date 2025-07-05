import { useCallback, useState, useEffect } from "react";
import { BookItem, uiStateType } from "../types/book";
import { createClient } from "@supabase/supabase-js";
import { useAlertProvider } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";

export const useBookFetch = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [uiState, setUIState] = useState<uiStateType>({
    isLoading: false,
    error: "",
  });
  const { onShowAlert } = useAlertProvider();
  const { user } = useAuth();

  const turnOnLoader = useCallback(() => {
    setUIState({ isLoading: true, error: "" });
  }, []);

  const turnOffLoader = useCallback(() => {
    setUIState({ isLoading: false, error: "" });
  }, []);

  const handleError = useCallback((msg: string) => {
    setUIState({ isLoading: false, error: msg });
  }, []);
  const fetchBooks = useCallback(async (): Promise<BookItem[]> => {
    if (!user) return [];

    try {
      turnOnLoader();
      const { data, error } = await supabase
        .from("books_inventory")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        onShowAlert({
          message: error.message,
          type: "error",
          visible: true,
        });
        throw new Error(error.message);
      }
      const result = Array.isArray(data) ? data : [];

      setBooks(result);

      turnOffLoader();
      return result;
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Couldn't fetch books!";
      onShowAlert({
        message: errorMessage,
        type: "error",
        visible: true,
      });
      handleError(errorMessage);
      return [];
    }
  }, [handleError, onShowAlert, turnOffLoader, turnOnLoader, user]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  return {
    books,
    uiState,
    setBooks,
    fetchBooks,
    turnOnLoader,
    turnOffLoader,
    handleError,
  };
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
