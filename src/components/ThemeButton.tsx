import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

const ThemeButton = () => {
  const { toggleTheme, theme } = useTheme();
  //   const isDark = theme === "dark"
  return (
    <div className="">
      <button
        type="button"
        className="text-[var(--text)])"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <DarkMode color="secondary" />
        ) : (
          <LightMode color="primary" />
        )}
      </button>
    </div>
  );
};

export default ThemeButton;
