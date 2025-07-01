import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookItem } from "../../types/book";
import { BookItemForDB } from "../../types/upsertBook";
import { useBookProvider } from "../../context/BookContext";

export const BookPriceBarChart = () => {
  const { books } = useBookProvider();

  const getAvgPricePerCategory = (books: BookItem[] | BookItemForDB[]) => {
    const categoryTotals: Record<string, { total: number; count: number }> = {};

    books.forEach((book) => {
      const cat = book.category;
      const price = Number(book.price);

      if (!categoryTotals[cat]) {
        categoryTotals[cat] = { total: price, count: 1 };
      } else {
        categoryTotals[cat].total += price;
        categoryTotals[cat].count += 1;
      }
    });

    return Object.entries(categoryTotals).map(([name, { total, count }]) => ({
      name,
      avgPrice: parseFloat((total / count).toFixed(2)),
    }));
  };
  const data = getAvgPricePerCategory(books);

  return (
    <div className="w-full aspect-[4/1] border border-[var(--neutral-100)] rounded-xl p-5">
      <h3 className="text-3xl text-center text-[var(--neutral-900)] mb-4">
        Average Price per Category
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} style={{ outline: "none" }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="avgPrice"
            fill="var(--primary-color)"
            style={{ outline: "none" }}
            activeBar={{
              fill: "var(--primary-color)",
              stroke: "none",
              strokeWidth: 0,
              width: 10, // Optional: keep it same as base to prevent stretching
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
