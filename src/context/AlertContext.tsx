/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import {
  AlertContextType,
  AlertState,
  InitialAlertState,
} from "../types/alert";
import { ContextProviderProps } from "../types/book";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: ContextProviderProps) => {
  const [alert, setAlert] = useState<AlertState>(InitialAlertState);

  const alertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handler for showing a temporary alert message
  const handleAlert = useCallback((update: AlertState) => {
    // 1. Show the new alert message (success or error)
    setAlert(update);

    // 2. If a previous alert is still active, cancel its timeout
    if (alertTimeout.current) clearTimeout(alertTimeout.current);

    // 3. Start a new timeout to hide the alert after 3 seconds
    alertTimeout.current = setTimeout(() => {
      setAlert(InitialAlertState); // Reset to initial (hidden) state
    }, 3000);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, onShowAlert: handleAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export const useAlertProvider = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlertProvider must be used within AlertProvider!");
  return context;
};
