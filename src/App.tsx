import "./App.css";
import { DialogWrapper } from "./components/WarningDialog";

import { AlertProvider } from "./context/AlertContext";
import { BookProvider } from "./context/BookContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AlertMessage } from "./components/Alert";
import { AuthProvider } from "./context/AuthContext";
import { MainApp } from "./MainApp";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AlertProvider>
          <BookProvider>
            <MainApp />
            <AlertMessage />
            <DialogWrapper />
          </BookProvider>
        </AlertProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
