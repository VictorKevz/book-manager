import { AutoStories, Category, Home, Settings } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ThemeButton from "../ThemeButton";

export const SideBar = () => {
  return (
    <aside className="fixed left-0 top-[5rem] w-[11rem] h-[calc(100vh-5rem)] bg-[var(--neutral-400)] border-r border-[var(--neutral-100)] p-5 flex flex-col justify-between z-40">
      <nav className="flex-1">
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
          className="text-[var(--neutral-600)] text-sm flex items-center gap-1.5"
        >
          <span className="text-[var(--neutral-600)]">
            {<page.icon fontSize="small" />}
          </span>{" "}
          <NavLink
            to={page.route}
            className={({ isActive }) =>
              isActive
                ? "text-[var(--primary-color)] font-bold"
                : "text-[var(--neutral-700)]"
            }
          >
            {page.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const pages = [
  { route: "/dashboard", text: "Overview", icon: Home },
  { route: "/dashboard/books", text: "Books", icon: AutoStories },
  { route: "/dashboard/categories", text: "Categories", icon: Category },
  { route: "/dashboard/settings", text: "Settings", icon: Settings },
];
