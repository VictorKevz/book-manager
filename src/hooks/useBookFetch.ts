import { useCallback, useState, useEffect } from "react";
import { BookItem, uiStateType } from "../types/book";
import { createClient } from "@supabase/supabase-js";
// import { useBookProvider } from "../context/BookContext";

export const useBookFetch = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  // const{turnOffLoader, turnOnLoader, handleError} = useBookProvider()
  const [uiState, setUIState] = useState<uiStateType>({
    isLoading: true,
    error: "",
  });

  const fetchBooks = useCallback(async (): Promise<BookItem[]> => {
    try {
      setUIState({ isLoading: true, error: "" });
      const { data, error } = await supabase
        .from("books_inventory")
        .select("*");
      if (error) throw new Error(error.message);
      const result = Array.isArray(data) ? data : [];

      setBooks(result);

      setUIState({ isLoading: false, error: "" });
      return result;
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Couldn't fetch books!";
      setUIState({ isLoading: false, error: errorMessage });
      return [];
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  return { books, uiState, setBooks, fetchBooks };
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
