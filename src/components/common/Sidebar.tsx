import { AutoStories, Category, Home, Settings } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import profile from "../../assets/profile.png";

export const SideBar = () => {
  return (
    <aside className="fixed bottom-0 w-full h-[4.5rem] px-4 xl:px-0 rounded-t-[2.5rem] border-t xl:border-t-0 xl:rounded-none bg-[var(--neutral-200)] xl:left-0 xl:top-[5rem] xl:w-[6rem] xl:h-[calc(100vh-5rem)] xl:bg-[var(--neutral-400)] xl:border-r border-[var(--neutral-100)] xl:py-3  flex flex-row xl:flex-col justify-between z-40">
      <nav className="flex items-center">
        <PagesList />
      </nav>
      <div className="flex items-center xl:flex-col gap-3 xl:border-t border-[var(--neutral-100)] xl:pt-3">
        <NavLink to="/dashboard/settings" className="  ">
          <img
            src={profile}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[var(--neutral-100)] object-left"
            alt="user profile picture"
          />
        </NavLink>
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
    <ul className="w-full flex flex-row xl:flex-col items-center gap-5">
      {pages.map((page) => (
        <li key={page.text} className="text-sm w-full">
          <NavLink
            to={page.route}
            className={`flex flex-col gap-1 items-center justify-center
              ${
                isActive(page.route)
                  ? "text-[var(--secondary-color)] font-bold px-4"
                  : "text-[var(--neutral-900)] px-4 font-light"
              }
            `}
          >
            <span>{<page.icon fontSize="small" />}</span>{" "}
            <span className="hidden sm:block">{page.text}</span>
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
