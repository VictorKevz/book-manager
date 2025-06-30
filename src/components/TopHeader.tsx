import { AddCircle, NotificationAdd } from "@mui/icons-material";
import { useBookProvider } from "../context/BookContext";
import { SearchBar } from "./common/SearchBar";

export const TopHeader = () => {
  const { toggleForm } = useBookProvider();
  return (
    <header className="w-full min-h-[5rem] fixed top-0 flex items-center justify-between px-5 bg-[var(--neutral-200)] border-b border-[var(--neutral-100)] z-20">
      <div className="flex items-center gap-2">
        <img src="./public/favicon.png" alt="logo" className="w-12 h-12" />
        <span className="text-xl font-bold text-[var(--neutral-900)]">B.M</span>
      </div>
      <SearchBar />
      <div className="flex items-center gap-5">
        <span>
          <NotificationAdd />
        </span>
        <button
          type="button"
          onClick={toggleForm}
          className="h-11 px-3 rounded-full bg-[var(--primary-color)] text-white gap-0.5"
        >
          <AddCircle />
          Create New Book
        </button>
      </div>
    </header>
  );
};
