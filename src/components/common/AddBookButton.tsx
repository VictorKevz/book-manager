import { useBookProvider } from "../../context/BookContext";
import { AddCircle } from "@mui/icons-material";
import { AddButtonProps } from "../../types/book";

export const AddBookButton = ({ id }: AddButtonProps) => {
  const { toggleForm } = useBookProvider();
  const isHeader = id === "topHeader";
  return (
    <button
      type="button"
      onClick={toggleForm}
      className={`h-11 min-w-fit ${
        isHeader ? "px-2 text-xs sm:text-lg" : "px-3"
      } rounded-xl bg-[var(--primary-color)] text-black/90 gap-0.5 justify-center`}
    >
      <AddCircle />
      <span className="">Create New Book</span>
    </button>
  );
};
