import "./App.css";
import { DialogWrapper } from "./components/common/WarningModal";

import ThemeButton from "./components/ThemeButton";
import { BookProvider } from "./context/BookContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BookPage } from "./pages/BookPage";

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <main className="w-full min-h-screen bg-[var(--neutral-400)] flex flex-col items-center justify-center gap-4 relative">
          <ThemeButton />
          <BookPage />
        </main>
        <DialogWrapper />
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
