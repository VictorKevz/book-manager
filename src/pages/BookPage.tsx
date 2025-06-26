import { BookEditor } from "../components/book-editor/BookEditor";
import BookCard from "../components/BookCard";
import { SyncLoaderWrapper } from "../components/common/Loaders";
import { useBookProvider } from "../context/BookContext";

export const BookPage = () => {
  const { isFormOpen, books, bookToEdit, toggleForm, uiState } =
    useBookProvider();
  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <section className="w-full flex-col items-start">
      <header className="w-ful">
        <p>This will be for categories</p>
        <button
          type="button"
          onClick={toggleForm}
          className="h-11 px-3 rounded-full bg-[var(--primary-color)] text-white"
        >
          Create New Book
        </button>
      </header>

      <div className="w-full grid grid-cols-3 gap-5 my-6">
        {books.map((book) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </div>

      {isFormOpen && <BookEditor book={bookToEdit} />}
    </section>
  );
};
