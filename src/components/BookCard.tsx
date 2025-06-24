import { Tune } from "@mui/icons-material";
import { useBookProvider } from "../context/BookContext";

const BookCard = () => {
  const { books } = useBookProvider();
  // const[showActions, setShowActions] = useState(false)
  return (
    <div className="max-w-7xl w-full grid grid-cols-3 gap-5 my-6">
      {books.slice(0, 9).map((book) => (
        <div
          key={book.title}
          className="p-3 rounded-xl shadow-2xl bg-[var(--neutral-200)] border border-[var(--neutral-100)]"
        >
          <div
            className="h-14 w-14  bg-center bg-cover rounded-xl"
            style={{
              backgroundImage: `url(${book.image_url})`,
            }}
          ></div>
          <h2 className="text-[var(--neutral-900)] font-bold text-xl">
            {book.title}
          </h2>
          <p className="text-sm text-[var(--neutral-800)]">
            {book.description}
          </p>
          <p className="text-[var(--neutral-900)] italic">~{book.author}</p>
          <span className="text-2xl text-[var(--primary-color)] font-bold">
            ${book.price}
          </span>
          <button type="button" className="my-2">
            <Tune />
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
