import { BookEditor } from "../components/book-editor/BookEditor";
import BookCard from "../components/BookCard";
import { SyncLoaderWrapper } from "../components/common/Loaders";
import { useBookProvider } from "../context/BookContext";

export const BookPage = () => {
  const { isFormOpen, books, bookToEdit, uiState } = useBookProvider();
  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <section className="max-w-screen-2xl w-full flex-col items-center justify-center ">
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 my-6">
        {books.map((book) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </div>

      {isFormOpen && <BookEditor book={bookToEdit} />}
    </section>
  );
};
