import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { BookItemForDB } from "../../types/upsertBook";
import { useBookProvider } from "../../context/BookContext";
import { BookItem } from "../../types/book";

export const BookCategoryPiechart = () => {
  const { books } = useBookProvider();
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28BD4",
    "#FF6666",
  ];
  const getCategoryData = (books: BookItemForDB[] | BookItem[]) => {
    const map: Record<string, number> = {};
    books.forEach((book) => {
      map[book.category] = (map[book.category] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };
  const data = getCategoryData(books);

  return (
    <div className="w-full aspect-[3/2] border border-[var(--neutral-100)] rounded-xl py-5 px-4">
      <h3 className="text-3xl text-[var(--neutral-900)] text-center">
        Books by Category
      </h3>

      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
