import { useEffect, useMemo, useState } from "react";
import { BookEditor } from "../../components/book-editor/BookEditor";
import BookCard from "../../components/BookCard";
import { SyncLoaderWrapper } from "../../components/common/Loaders";
import { useBookProvider } from "../../context/BookContext";
import { useSearchProvider } from "../../context/SearchContext";
import { SortOption } from "../../types/search";
import { sortByData } from "../../data/searchData";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { PaginateItems } from "./PaginateItems";
import { DropDown } from "./DropDown";
import noResultsImg from "../../assets/no-results.png";
export const BookPage = () => {
  const { books, uiState } = useBookProvider();
  const { debouncedQuery, categoryData } = useSearchProvider();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<SortOption>({
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

  const updateSortOption = (option: SortOption, label: string) => {
    setSortOption(option);
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

    // 3. Sort the filtered results
    const { field, order } = sortOption;

    const sorted = [...filtered].sort((a, b) => {
      if (field === "stock") {
        const diff = Number(a.quantity) - Number(b.quantity);
        return order === "asc" ? diff : -diff;
      }

      const compare = a[field].localeCompare(b[field]);
      return order === "asc" ? compare : -compare;
    });

    return sorted;
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
  return (
    <section className="max-w-screen-2xl w-full mx-auto ">
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
                onSortUpdate={updateSortOption}
                data={sortByData}
                sortLabel={sortLabel}
              />
            )}
          </div>
        </div>
        <ul className="w-full flex flex-wrap items-center justify-between gap-5 mt-5">
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
        <div className="w-fit mx-auto px-5 min-h-[20rem] flex flex-col items-center justify-between gap-5 py-8 border border-[var(--neutral-100)] rounded-xl">
          <img src={noResultsImg} className="w-[15rem]" alt="" />
          <p className="text-[var(--neutral-900)]">
            Looks like you don't have a book that matches your search:
            <strong className="px-1 text-[var(--secondary-color)]">
              "{debouncedQuery}".
            </strong>{" "}
            Please try another search.
          </p>
        </div>
      )}
      {/* {isFormOpen && <BookEditor book={bookToEdit} />} */}
    </section>
  );
};

export const BookEditorWrapper = () => {
  const { bookToEdit, isFormOpen } = useBookProvider();
  return <>{isFormOpen && <BookEditor book={bookToEdit} />}</>;
};
