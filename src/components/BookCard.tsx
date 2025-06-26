import { MoreVert } from "@mui/icons-material";
import { useBookProvider } from "../context/BookContext";
import { useState } from "react";
import { BookCardProps, BookItem } from "../types/book";

const BookCard = ({ book }: BookCardProps) => {
  const { onFormEdit, onModalOpen } = useBookProvider();

  const [openMenuTitle, setOpenMenuTitle] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenuTitle((prev) => (prev === title ? null : title));
  };

  const handleOptions = (option: string, book: BookItem) => {
    if (option === "Edit") onFormEdit(book);
    else if (option === "Delete") onModalOpen(book.id);
  };

  const options = ["Edit", "Delete"];
  return (
    <div
      key={book.title}
      className="relative p-3 rounded-xl shadow-2xl bg-[var(--neutral-200)] border border-[var(--neutral-100)]"
    >
      <div className="absolute top-4 right-4">
        <button
          type="button"
          onClick={() => toggleMenu(book.title)}
          className="my-2 h-8 w-8 rounded-full bg-[var(--neutral-100)] text-[var(--neutral-900)]"
        >
          <MoreVert />
        </button>
        {openMenuTitle === book.title && (
          <ul className="absolute top-full right-0 p-5 flex flex-col gap-1.5 items-start rounded-sm bg-[var(--neutral-300)] border border-[var(--neutral-100)] shadow-xl">
            {options.map((option) => {
              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handleOptions(option, book)}
                    className="text-[var(--neutral-900)]"
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div
        className="h-14 w-14  bg-center bg-cover rounded-xl"
        style={{
          backgroundImage: `url(${book.image_url})`,
        }}
      ></div>
      <h2 className="text-[var(--neutral-900)] font-bold text-xl">
        {book.title}
      </h2>
      <p className="text-sm text-[var(--neutral-800)]">{book.description}</p>
      <p className="text-[var(--neutral-900)] italic">~{book.author}</p>
      <span className="text-2xl text-[var(--primary-color)] font-bold">
        ${book.price}
      </span>
    </div>
  );
};

export default BookCard;
