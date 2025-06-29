import { useMemo } from "react";
import { BookEditor } from "../components/book-editor/BookEditor";
import BookCard from "../components/BookCard";
import { SyncLoaderWrapper } from "../components/common/Loaders";
import { useBookProvider } from "../context/BookContext";
import { useSearchProvider } from "../context/SearchContext";

export const BookPage = () => {
  const { isFormOpen, books, bookToEdit, uiState } = useBookProvider();
  const { debouncedQuery, categoryData } = useSearchProvider();

  const filteredBooks = useMemo(() => {
    const q = debouncedQuery.trim();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [books, debouncedQuery]);

  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <section className="max-w-screen-2xl w-full flex-col items-center justify-center ">
      <header className="w-full">
        <ul className="w-full flex items-center justify-start gap-1">
          {categoryData.map((category) => {
            const isSelected = category.name === "All";
            return (
              <li key={category.name}>
                <button
                  type="button"
                  className={`h-8 w-fit  pl-0.5 pr-4 rounded-full gap-2 border border-transparent ${
                    isSelected
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-[var(--neutral-200)] text-[var(--neutral-700)] border-[var(--neutral-100)]"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center h-6.5 w-6.5 rounded-full   ${
                      isSelected
                        ? "bg-white/80 text-black/80"
                        : "bg-[var(--neutral-400)] text-[var(--neutral-800)]"
                    }`}
                  >
                    <category.icon fontSize="small" className="scale-70" />
                  </span>
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </header>
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 my-6">
        {filteredBooks.map((book) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </div>

      {isFormOpen && <BookEditor book={bookToEdit} />}
    </section>
  );
};
