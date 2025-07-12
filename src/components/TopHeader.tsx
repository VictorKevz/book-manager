import { SearchBar } from "./common/SearchBar";
import logo from "../../public/favicon.png";
import { AddBookButton } from "./common/AddBookButton";
import { Close, Search } from "@mui/icons-material";
import { useState } from "react";

export const TopHeader = () => {
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);

  const toggleSearchBar = () => {
    setSearchBarOpen((prev) => !prev);
  };
  return (
    <header
      className={`w-full min-h-[5rem] fixed top-0 flex items-center justify-between gap-8  bg-[var(--neutral-200)] border-b border-[var(--neutral-100)] z-20 ${
        isSearchBarOpen ? "px-0" : "px-4"
      }`}
    >
      <div className="flex items-center gap-2 mr-8 md:mr-0">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-[var(--neutral-900)]">B.M</span>
      </div>
      <div className="sm:max-w-md sm:w-full flex items-center justify-center">
        <div className=" sm:w-full hidden sm:flex">
          <SearchBar />
        </div>

        <span
          role="button"
          className="flex sm:hidden h-12 w-12 bg-[var(--neutral-50)] border border-[var(--neutral-100)] text-[var(--neutral-900)] items-center justify-center rounded-full"
          onClick={toggleSearchBar}
        >
          <Search />
        </span>
      </div>

      <AddBookButton />
      {isSearchBarOpen && (
        <div className="w-full flex flex-col items-center gap-4 fixed top-0 z-30 backdrop-blur-[.5rem] bg-black/10 min-h-[5rem] p-4 ">
          <SearchBar />
          <button
            type="button"
            onClick={toggleSearchBar}
            className="h-10 w-10 absolute top-full mt-1 shadow-2xl bg-[var(--neutral-100)] justify-center rounded-full text-[var(--neutral-900)] hover:bg-[var(--neutral-700)]"
          >
            <Close />
          </button>
        </div>
      )}
    </header>
  );
};
