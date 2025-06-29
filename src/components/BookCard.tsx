import {
  Category,
  DeleteForever,
  EditDocument,
  MoreVert,
  PriceCheck,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { useBookProvider } from "../context/BookContext";
import { useState } from "react";
import { BookCardProps, BookItem } from "../types/book";

const BookCard = ({ book }: BookCardProps) => {
  const { onFormEdit, onModalOpen } = useBookProvider();

  const [openMenuTitle, setOpenMenuTitle] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenuTitle((prev) => (prev === title ? null : title));
  };

  const handleOptions = (book: BookItem, option: string) => {
    const { id, title, image_url } = book;

    if (option === "Edit") {
      onFormEdit(book);
    } else {
      onModalOpen({ id, title, image_url });
    }

    setOpenMenuTitle(null);
  };

  return (
    <article
      key={book.id}
      className="flex flex-col items-start justify-between rounded-2xl shadow-2xl bg-[var(--neutral-200)] border border-[var(--neutral-100)]"
    >
      <div className="flex items-start justify-between gap-2 p-3">
        <div className="">
          <header className="flex flex-col gap-1 items-start">
            <div
              className="h-20 w-14  bg-center bg-cover rounded-xl"
              style={{
                backgroundImage: `url(${book.image_url})`,
              }}
            ></div>
            <h2 className="text-[var(--neutral-900)] font-bold text-xl">
              {book.title}
            </h2>
            <p className="text-sm text-[var(--neutral-700)] w-[90%]">
              {book.description}
            </p>
            <p className="text-[var(--neutral-900)] italic">~{book.author}</p>
          </header>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu(book.title)}
            className="my-2 h-8 w-8 rounded-full bg-[var(--neutral-100)] text-[var(--neutral-900)]"
          >
            <MoreVert />
          </button>
          {openMenuTitle === book.title && (
            <ul className="absolute top-full mt-1 -right-2 py-5 px-7 flex flex-col gap-1.5 items-start rounded-sm bg-[var(--neutral-300)] border border-[var(--neutral-100)] shadow-xl">
              <div className="absolute -top-2 right-4 w-4 h-4 bg-[var(--neutral-300)] border-l border-t border-[var(--neutral-100)] rotate-45"></div>

              {["Edit", "Delete"].map((option) => {
                const isEdit = option === "Edit";
                return (
                  <li key={option} className="py-2">
                    <button
                      type="button"
                      onClick={() => handleOptions(book, option)}
                      className="text-[var(--neutral-900)] gap-1 hover:text-[var(--primary-color)]"
                    >
                      {isEdit ? <EditDocument /> : <DeleteForever />}
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <footer className="w-full flex items-center justify-between bg-[var(--neutral-400)] p-3 rounded-b-2xl text-[var(--neutral-700)]">
        <p className="text-[var(--primary-color)] flex items-center gap-1">
          <span className="text-[var(--neutral-700)]">
            <PriceCheck />
          </span>
          ${book.price}
        </p>

        <p className="flex items-center gap-1">
          <span className="text-[var(--neutral-700)]">
            <ProductionQuantityLimits />
          </span>
          {book.quantity}
        </p>
        <p className="flex items-center gap-1">
          <span className="text-[var(--neutral-700)]">
            <Category />
          </span>
          {book.category}
        </p>
      </footer>
    </article>
  );
};

export default BookCard;
