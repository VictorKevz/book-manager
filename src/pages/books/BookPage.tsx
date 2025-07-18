import { useEffect, useMemo, useState } from "react";
import { BookEditor } from "../../components/book-editor/BookEditor";
import BookCard from "../../components/BookCard";
import { SyncLoaderWrapper } from "../../components/common/Loaders";
import { useBookProvider } from "../../context/BookContext";
import { useSearchProvider } from "../../context/SearchContext";
import { DropdownOption } from "../../types/search";
import { categoryData, sortByData } from "../../data/searchData";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { PaginateItems } from "./PaginateItems";
import { DropDown } from "./DropDown";
import noResultsImg from "../../assets/no-results.png";
import emptyImg from "../../assets/empty-books.svg";
import { EmptyViewType } from "../../types/book";
import { EmptyView } from "../../components/common/EmptyView";

export const BookPage = () => {
  const { books, uiState } = useBookProvider();
  const { debouncedQuery } = useSearchProvider();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<DropdownOption>({
    type: "sort",
    label: "Author (A–Z)",
    field: "author",
    order: "asc",
  });
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [sortLabel, setSortLabel] = useState<string>("Author (A–Z)");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const updateCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const updateSortOption = (option: DropdownOption, label: string) => {
    if (option.type !== "sort") return; // ignore non-sort options here
    setSortOption({
      type: "sort",
      label,
      field: option.field,
      order: option.order,
    });
    setSortLabel(label);
    toggleDropDown();
  };

  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };
  const filteredBooks = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    // 1. Filter by category
    let filtered =
      selectedCategory === "All"
        ? books
        : books.filter((b) => b.category === selectedCategory);

    // 2. Filter by search query (title or author)
    if (q.length >= 3) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    // 3. Sort the filtered results ONLY if sortOption.type is 'sort'
    if (sortOption.type === "sort") {
      const { field, order } = sortOption;

      filtered = [...filtered].sort((a, b) => {
        if (field === "stock") {
          const diff = Number(a.quantity) - Number(b.quantity);
          return order === "asc" ? diff : -diff;
        }
        const compare = a[field].localeCompare(b[field]);
        return order === "asc" ? compare : -compare;
      });
    }

    return filtered;
  }, [books, debouncedQuery, selectedCategory, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, selectedCategory, sortOption]);

  // Responsible for dynamically updating items per page based on screen size
  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;

      if (width < 640) setItemsPerPage(4);
      else if (width >= 640 && width < 1536) setItemsPerPage(6);
      else setItemsPerPage(8);
    };

    updateItems();
    window.addEventListener("resize", updateItems);

    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredBooks]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  const overviewEmpty: Record<keyof EmptyViewType, string> = {
    title: "No Books Available Yet",
    description:
      "  Once you’ve added a book, it will appear here. Click the “Add Book” button to get started.",
    image: emptyImg,
    id: "overview",
  };
  if (books.length === 0) return <EmptyView data={overviewEmpty} />;

  return (
    <section className="max-w-screen-2xl w-full mx-auto">
      <header className="w-full flex flex-col items-start">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-[var(--neutral-900)] text-2xl">Filters</h2>
          <div className="relative flex flex-col items-start justify-start z-10">
            <span className="font-bold text-sm text-[var(--neutral-700)]">
              Sort By:
            </span>
            <button
              type="button"
              onClick={toggleDropDown}
              className="min-w-[12rem] w-full h-12 border border-[var(--neutral-100)] rounded-lg px-4 text-[var(--neutral-900)] justify-between"
            >
              {sortLabel}{" "}
              <span>
                {dropDown ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </span>
            </button>
            {dropDown && (
              <DropDown
                onOptionUpdate={updateSortOption}
                data={sortByData}
                currentLabel={sortLabel}
              />
            )}
          </div>
        </div>
        <ul className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 mt-5">
          {categoryData.map((category) => {
            const isSelected = category.label === selectedCategory;
            return (
              <li key={category.label}>
                <button
                  type="button"
                  onClick={() => updateCategory(category.label)}
                  className={`h-14 w-full pl-0.5 pr-3 rounded-2xl gap-2 border ${
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
                    {category.type === "category" && category.icon && (
                      <category.icon fontSize="large" className="scale-80" />
                    )}
                  </span>
                  {category.label}
                </button>
              </li>
            );
          })}
        </ul>
      </header>
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-6 py-5">
        {paginatedBooks.map((book) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </div>
      <PaginateItems
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Renders the no-search results UI */}
      {paginatedBooks.length === 0 && (
        <div className="w-fit mx-auto px-4 flex flex-col items-center justify-between rounded-xl">
          <img src={noResultsImg} className="w-[10rem]" alt="" />
          <h3 className="text-2xl mt-4">No Book Found!</h3>
          <p className="text-[var(--neutral-900)] text-base">
            Looks like you don't have a book in this category. Please try
            another search.
          </p>
        </div>
      )}
    </section>
  );
};

export const BookEditorWrapper = () => {
  const { bookToEdit, isFormOpen } = useBookProvider();
  return <>{isFormOpen && <BookEditor book={bookToEdit} />}</>;
};
