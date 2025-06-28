import { AutoStories, Category, Home, Settings } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ThemeButton from "../ThemeButton";

export const SideBar = () => {
  return (
    <aside className="bg-[var(--neutral-400)] fixed left-0 top-[5rem] bottom-0 w-fit p-5 flex flex-col items-start justify-between border-r border-[var(--neutral-100)]">
      <nav className="w-full h-full">
        <PagesList />
      </nav>
      <div className="flex items-center flex-col gap-3">
        <button type="button" className="  ">
          <img
            src="./public/profile.png"
            className="w-14 h-14 rounded-full border-2 border-[var(--neutral-100)] object-left"
            alt="user profile picture"
          />
        </button>
        <ThemeButton />
      </div>
    </aside>
  );
};

export const PagesList = () => {
  return (
    <ul className="w-full flex flex-col items-start gap-2">
      {pages.map((page) => (
        <li
          key={page.text}
          className="text-[var(--neutral-700)] text-sm flex items-center gap-1.5"
        >
          <span className="text-[var(--secondary-color)]">
            {<page.icon fontSize="large" />}
          </span>{" "}
          <NavLink to={page.route}>{page.text}</NavLink>
        </li>
      ))}
    </ul>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const pages = [
  { route: "", text: "Overview", icon: Home },
  { route: "books", text: "Books", icon: AutoStories },
  { route: "categories", text: "Categories", icon: Category },
  { route: "settings", text: "Settings", icon: Settings },
];
