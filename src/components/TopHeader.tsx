import { SearchBar } from "./common/SearchBar";
import logo from "../../public/favicon.png";
import { AddBookButton } from "./common/AddBookButton";
// import { NavLink } from "react-router-dom";
// import profile from "../assets/profile.png";

export const TopHeader = () => {
  return (
    <header className="w-full min-h-[5rem] fixed top-0 flex items-center justify-between px-5 bg-[var(--neutral-200)] border-b border-[var(--neutral-100)] z-20">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-[var(--neutral-900)]">B.M</span>
      </div>
      <SearchBar />
      <AddBookButton />
      {/* <NavLink to="/dashboard/settings" className="  ">
          <img
            src={profile}
            className="w-8 h-8 rounded-full border-2 border-[var(--neutral-700)] object-left"
            alt="user profile picture"
          />
        </NavLink> */}
    </header>
  );
};
