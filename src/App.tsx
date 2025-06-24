import "./App.css";
import BookCard from "./components/BookCard";
import { CreateBook } from "./components/CreateBook";

import ThemeButton from "./components/ThemeButton";
import { BookProvider } from "./context/BookContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <main
          className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-4 relative"
          style={{ backgroundImage: "var(--main-bg)" }}
        >
          <CreateBook />
          <BookCard />
          <ThemeButton />
        </main>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
