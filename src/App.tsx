import "./App.css";
import { DialogWrapper } from "./components/WarningDialog";

import ThemeButton from "./components/ThemeButton";
import { AlertProvider } from "./context/AlertContext";
import { BookProvider } from "./context/BookContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BookPage } from "./pages/BookPage";
import { AlertMessage } from "./components/Alert";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <BookProvider>
          <main className="w-full min-h-screen bg-[var(--neutral-400)] flex flex-col items-center justify-center gap-4 relative">
            <ThemeButton />
            <BookPage />
          </main>
          <AlertMessage />
          <DialogWrapper />
          <RegisterPage />
        </BookProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
