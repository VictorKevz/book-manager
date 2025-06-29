import { useMemo, useState } from "react";
import { BookEditor } from "../components/book-editor/BookEditor";
import BookCard from "../components/BookCard";
import { SyncLoaderWrapper } from "../components/common/Loaders";
import { useBookProvider } from "../context/BookContext";
import { useSearchProvider } from "../context/SearchContext";

export const BookPage = () => {
  const { isFormOpen, books, bookToEdit, uiState } = useBookProvider();
  const { debouncedQuery, categoryData } = useSearchProvider();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const updateCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredBooks = useMemo(() => {
    let filteredByCategory;
    if (selectedCategory === "All") {
      filteredByCategory = books;
    } else {
      filteredByCategory = books.filter((b) => b.category === selectedCategory);
    }
    const q = debouncedQuery.trim();
    return filteredByCategory.filter(
      (b) =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [books, debouncedQuery, selectedCategory]);

  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <section className="max-w-screen-2xl w-full flex-col items-center justify-center ">
      <header className="w-full flex flex-col items-start">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-[var(--neutral-900)] text-2xl">Filters</h2>
          <button
            type="button"
            className="max-w-[15rem] w-full h-12 border border-[var(--neutral-100)] rounded-lg px-3"
          >
            Sort by:
          </button>
        </div>
        <ul className="w-full flex items-center justify-between mt-5">
          {categoryData.map((category) => {
            const isSelected = category.name === selectedCategory;
            return (
              <li key={category.name}>
                <button
                  type="button"
                  onClick={() => updateCategory(category.name)}
                  className={`h-14 w-full max-w-[12rem]  pl-0.5 pr-4 rounded-2xl gap-2 border ${
                    isSelected
                      ? "bg-[var(--primary-color)] text-white border-transparent"
                      : "bg-[var(--neutral-200)] text-[var(--neutral-900)] border-[var(--neutral-600)]"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center h-12 w-12 rounded-xl   ${
                      isSelected
                        ? "bg-white/80 text-black/80"
                        : "bg-[var(--neutral-400)] text-[var(--neutral-800)]"
                    }`}
                  >
                    <category.icon fontSize="large" className="scale-80" />
                  </span>
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </header>
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-6 py-5">
        {filteredBooks.map((book) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </div>

      {isFormOpen && <BookEditor book={bookToEdit} />}
    </section>
  );
};
