import { useCallback, useState, useEffect } from "react";
import { UIStateType } from "../types/book";
import { createClient } from "@supabase/supabase-js";
import { useAlertProvider } from "../context/AlertContext";
import { useAuth } from "../context/AuthContext";

export const useUserDataFetch = <T>(
  table: string,
  filterKey: string = "user_id"
) => {
  const [data, setData] = useState<T[]>([]);
  const [uiState, setUIState] = useState<UIStateType>({
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

  const fetchData = useCallback(async (): Promise<T[]> => {
    if (!user) return [];

    try {
      turnOnLoader();
      const { data: fetchedData, error } = await supabase
        .from(table)
        .select("*")
        .eq(filterKey, user.id);

      if (error) throw new Error(error.message);

      const result = Array.isArray(fetchedData) ? fetchedData : [];
      setData(result);
      turnOffLoader();
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Fetch failed.";
      onShowAlert({ message: msg, type: "error", visible: true });
      handleError(msg);
      return [];
    }
  }, [
    user,
    turnOnLoader,
    table,
    filterKey,
    turnOffLoader,
    onShowAlert,
    handleError,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    uiState,
    fetchData,
    turnOnLoader,
    turnOffLoader,
    handleError,
  };
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
