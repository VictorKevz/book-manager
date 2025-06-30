import { AutoStories, Category, Home, Settings } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import profile from "../../assets/profile.png";

export const SideBar = () => {
  return (
    <aside className="fixed left-0 top-[5rem] w-[11rem] 2xl:w-[13rem] h-[calc(100vh-5rem)] bg-[var(--neutral-400)] border-r border-[var(--neutral-100)] py-3  flex flex-col justify-between z-40">
      <nav className="flex-1 px-2.5">
        <PagesList />
      </nav>
      <div className="flex items-center flex-col gap-3 border-t border-[var(--neutral-100)] pt-3">
        <button type="button" className="  ">
          <img
            src={profile}
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
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };

  return (
    <ul className="w-full flex flex-col items-start gap-2">
      {pages.map((page) => (
        <li key={page.text} className="text-sm w-full flex items-start">
          <NavLink
            to={page.route}
            className={`flex gap-1.5 items-center justify-start
              ${
                isActive(page.route)
                  ? "text-[var(--secondary-color)] w-full h-8 bg-[var(--neutral-100)] rounded-sm font-bold px-4"
                  : "text-[var(--neutral-900)] px-4 font-light"
              }
            `}
          >
            <span>{<page.icon fontSize="small" />}</span> {page.text}
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
