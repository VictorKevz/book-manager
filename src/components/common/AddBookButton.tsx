import { useBookProvider } from "../../context/BookContext";
import { AddCircle } from "@mui/icons-material";

export const AddBookButton = () => {
  const { toggleForm } = useBookProvider();

  return (
    <button
      type="button"
      onClick={toggleForm}
      className="h-11 min-w-fit px-2 text-xs sm:text-lg rounded-xl bg-[var(--primary-color)] text-black/90 gap-0.5 justify-center"
    >
      <AddCircle />
      <span className="">Create New Book</span>
    </button>
  );
};
