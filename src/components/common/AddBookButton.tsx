import { useBookProvider } from "../../context/BookContext";
import { AddCircle } from "@mui/icons-material";

export const AddBookButton = () => {
  const { toggleForm } = useBookProvider();

  return (
    <button
      type="button"
      onClick={toggleForm}
      className="h-11 px-3 rounded-xl bg-[var(--primary-color)] text-white gap-0.5 justify-center"
    >
      <AddCircle />
      <span className="hidden md:block">Create New Book</span>
    </button>
  );
};
