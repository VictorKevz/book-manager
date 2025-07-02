import { NotificationAdd } from "@mui/icons-material";
import { SearchBar } from "./common/SearchBar";
import logo from "../../public/favicon.png";
import { AddBookButton } from "./common/AddBookButton";
export const TopHeader = () => {
  return (
    <header className="w-full min-h-[5rem] fixed top-0 flex items-center justify-between px-5 bg-[var(--neutral-200)] border-b border-[var(--neutral-100)] z-20">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-[var(--neutral-900)]">B.M</span>
      </div>
      <SearchBar />
      <div className="flex items-center gap-5">
        <span>
          <NotificationAdd />
        </span>
        <AddBookButton />
      </div>
    </header>
  );
};
