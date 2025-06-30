import { Close, Search } from "@mui/icons-material";
import { useSearchProvider } from "../../context/SearchContext";
import { InputType } from "../../types/upsertBook";

export const SearchBar = () => {
  const { OnQueryChange, query, onClearQuery } = useSearchProvider();
  return (
    <label className="max-w-md w-full relative flex items-center">
      <input
        type="text"
        className="w-full h-12 bg-[var(--neutral-200)] pl-4 text-[var(--neutral-900)] border border-[var(--neutral-100)] rounded-xl"
        value={query}
        onChange={(event: InputType) => OnQueryChange(event)}
        placeholder="Search by title or author..."
      />
      <span className="absolute right-0 h-12 px-4 flex items-center justify-center bg-[var(--neutral-400)] rounded-r-lg text-[var(--neutral-900)]">
        <Search />
      </span>
      {query && (
        <button
          type="button"
          onClick={onClearQuery}
          className="absolute right-14 text-[var(--error)]"
        >
          <Close />
        </button>
      )}
    </label>
  );
};
