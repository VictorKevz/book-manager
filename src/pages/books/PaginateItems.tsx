import { PaginateItemsProps } from "../../types/search";

export const PaginateItems = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginateItemsProps) => {
  return (
    <ul className="w-full items-center justify-center flex gap-2 mt-6">
      {Array.from({ length: totalPages }, (_, i) => {
        const isCurrent = currentPage === i + 1;
        return (
          <li key={i}>
            <button
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                isCurrent
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-[var(--neutral-900)] text-[var(--neutral-50)]"
              }`}
            >
              {i + 1}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
