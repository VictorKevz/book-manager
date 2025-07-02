import { Category, MenuBook, PriceCheck } from "@mui/icons-material";
import bookUploadImg from "../../assets/book-upload.png";
import { AddBookButton } from "../../components/common/AddBookButton";
import { useBookProvider } from "../../context/BookContext";
import { useSearchProvider } from "../../context/SearchContext";
import BookCard from "../../components/BookCard";
import { Link } from "react-router-dom";
import { BookCategoryPiechart } from "./BookCategoryPiechart";
import { BookPriceBarChart } from "./BookPriceBarChart";
import { SyncLoaderWrapper } from "../../components/common/Loaders";

export const Overview = () => {
  const { books, uiState } = useBookProvider();
  const { categoryData } = useSearchProvider();

  const totals = books.reduce(
    (acc, book) => {
      const qty = parseInt(book.quantity, 10);
      const price = parseFloat(book.price);
      acc.totalQuantity += qty;
      acc.totalPrice += price * qty;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const convertedTotalValue = formatter.format(Number(totals.totalPrice));
  // For display purposes only - show first 3 books with the lowest quantity
  const topSellingBooks = books
    .filter((book) => Number(book.quantity) <= 15)
    .slice(0, 3);

  const statsCardData = [
    {
      id: 1,
      icon: MenuBook,
      label: "Total Books",
      value: totals.totalQuantity,
    },
    {
      id: 2,
      icon: Category,
      label: "Total Categories",
      value: categoryData.length,
    },
    {
      id: 3,
      icon: PriceCheck,
      label: "Inventory Value",
      value: convertedTotalValue,
    },
  ];
  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <section className="max-w-screen-xl w-full flex flex-col items-center justify-center mx-auto mt-6">
      <header className="w-full bg-[var(--neutral-200)] flex flex-col items-center justify-between gap-5 py-6 px-5 border border-[var(--neutral-100)] rounded-xl md:flex-row">
        <div className="flex flex-col gap-1.5 items-start md:w-[80%]">
          <h2 className="text-[var(--neutral-900)] text-3xl">
            Add new books to increase your sales
          </h2>
          <p className="text-[var(--neutral-700)] w-[80%] mb-4">
            Keeping your inventory fresh helps attract more readers and boosts
            engagement. Stay ahead by regularly updating your collection.
          </p>
          <AddBookButton />
        </div>
        <figure className="max-w-[12rem] w-full">
          <img src={bookUploadImg} alt="" className="w-full" />
        </figure>
      </header>
      <div className="w-full grid gap-5 xl:grid-cols-2 mt-10">
        <div className="grid md:grid-cols-3 md:col-span-3 xl:grid-cols-2 xl:col-span-1 gap-5 w-full">
          {statsCardData.map((card) => (
            <div
              key={card.id}
              className={`border border-[var(--neutral-100)] flex flex-col items-center justify-center gap-3 rounded-xl py-4 px-4 ${
                card.id === 3 && "xl:col-span-2"
              }`}
            >
              <card.icon
                fontSize="large"
                className="text-[var(--neutral-900)] scale-110"
              />
              <h3 className="text-3xl text-[var(--primary-color)]">
                {card.value}
              </h3>
              <p className="text-[var(--neutral-700)]">{card.label}</p>
            </div>
          ))}
        </div>
        <div className="w-full md:col-span-3 xl:col-span-1">
          <BookCategoryPiechart />
        </div>
      </div>
      <div className="w-full mt-10">
        <BookPriceBarChart />
      </div>
      <div className="w-full mt-10">
        <h3 className="text-2xl text-[var(--neutral-900)]">
          Top Selling Books
        </h3>
        <div className="w-full grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4">
          {topSellingBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="w-full flex items-center justify-end mt-4">
          <Link
            to="/dashboard/books"
            className="h-11 flex items-center justify-center rounded-xl bg-[var(--neutral-50)] text-[var(--neutral-900)] font-medium px-4 border border-[var(--secondary-color)]"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
};
