import { createContext, useState, useCallback, useContext } from "react";
import { AlertContextType, AlertState, EmptyAlertState } from "../types/alert";
import { ContextProviderProps } from "../types/book";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: ContextProviderProps) => {
  const [alert, setAlert] = useState<AlertState>(EmptyAlertState);

  const showAlert = useCallback((state: AlertState) => {
    setAlert(state);
  }, []);

  const hideAlert = () => {
    setAlert(EmptyAlertState);
  };

  return (
    <AlertContext.Provider
      value={{ alert, onHideAlert: hideAlert, onShowAlert: showAlert }}
    >
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
