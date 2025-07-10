import {
  Code,
  DarkMode,
  DevicesOther,
  FontDownload,
  FormatUnderlined,
  LightMode,
  LockReset,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import uk from "../../assets/uk.png";
import fi from "../../assets/finland.png";
import {
  Font,
  fontMap,
  Language,
  PreferenceDataType,
  PreferenceKey,
  Theme,
} from "../../types/settings";
import { useTheme } from "../../context/ThemeContext";
import { useAlertProvider } from "../../context/AlertContext";

export const PreferenceTab = () => {
  const { theme, onThemeUpdate } = useTheme();
  const { onShowAlert } = useAlertProvider();

  const [font, setFont] = useState<Font>("modern");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = (localStorage.getItem("font") as Font) || "modern";
    setFont(saved);
    document.documentElement.style.setProperty("--app-font", fontMap[saved]);
  }, []);

  const handleUpdate = (type: PreferenceKey, value: string) => {
    if (type === "theme") {
      onThemeUpdate(value as Theme);
    } else if (type === "font") {
      setFont(value as Font);
      localStorage.setItem("font", value);
      document.documentElement.style.setProperty(
        "--app-font",
        fontMap[value as Font]
      );
    } else if (type === "language") {
      setLanguage(value as Language);
    }
  };

  const handleReset = () => {
    onThemeUpdate("system");
    setFont("modern");
    setLanguage("en");
    localStorage.setItem("font", "modern");
    document.documentElement.style.setProperty("--app-font", fontMap["modern"]);
    onShowAlert({
      message: "Preferences reset to default",
      type: "success",
      visible: true,
    });
  };

  const preferences: PreferenceDataType[] = [
    {
      title: "Customize Color Theme",
      description: "Choose a color theme that suits you.",
      type: "theme",
      selected: theme,
      data: [
        {
          value: "light",
          label: "Light Mode",
          icon: LightMode,
          description: "Clean white layout",
        },
        {
          value: "dark",
          label: "Dark Mode",
          icon: DarkMode,
          description: "Low-glare layout",
        },
        {
          value: "system",
          label: "System",
          icon: DevicesOther,
          description: "Follows device theme",
        },
      ],
    },
    {
      title: "Customize Font ",
      description: "Choose a font style that suits you.",
      type: "font",
      selected: font,
      data: [
        {
          value: "modern",
          label: "Modern",
          icon: FontDownload,
          description: "Sans-serif font",
        },
        {
          value: "classic",
          label: "Classic",
          icon: FormatUnderlined,
          description: "Serif style",
        },
        {
          value: "code",
          label: "Code",
          icon: Code,
          description: "Monospace font",
        },
      ],
    },
    {
      title: "Customize Language",
      description: "Choose a language that suits you.",
      type: "language",
      selected: language,
      data: [
        {
          value: "en",
          label: "English",
          icon: uk,
          description: "App in English",
        },
        {
          value: "fi",
          label: "Finnish",
          icon: fi,
          description: "App in Finnish",
        },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10 mt-6 max-w-screen-xl">
      {preferences.map((pref, i) => (
        <div
          key={pref.type}
          className={`${
            i !== 0 && "border-t border-[var(--neutral-100)] py-5"
          }`}
        >
          <h3 className="text-xl font-semibold">{pref.title}</h3>
          <p className="">{pref.description}</p>
          <div className="grid grid-cols-3 gap-4 mt-6 w-full">
            {pref.data.map((item) => {
              const isActive = item.value === pref.selected;
              const isFont = pref.type === "font";
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleUpdate(pref.type, item.value)}
                  style={{
                    fontFamily: isFont
                      ? fontMap[item.value as Font]
                      : undefined,
                  }}
                  className={`w-full border px-4 py-6 rounded-lg flex-col justify-between hover:bg-[var(--neutral-200)] ${
                    isActive
                      ? "border-[var(--secondary-color)] bg-[var(--neutral-300)]"
                      : "border-[var(--neutral-100)]"
                  }`}
                >
                  {pref.type === "language" && typeof item.icon === "string" ? (
                    <span
                      style={{ backgroundImage: `url(${item.icon})` }}
                      className="h-20 w-20 border bg-cover rounded-xl mb-4"
                    ></span>
                  ) : (
                    <span className="h-20 w-20 flex items-center justify-center my-5 text-[var(--neutral-700)] border bg-[var(--neutral-400)] rounded-xl">
                      <item.icon fontSize="large" />
                    </span>
                  )}
                  <h3 className="text-lg">{item.label}</h3>
                  <p className="text-sm mb-2">{item.description}</p>
                  {isActive ? (
                    <RadioButtonChecked className="text-[var(--primary-color)]" />
                  ) : (
                    <RadioButtonUnchecked className="text-[var(--neutral-700)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="h-12 w-fit px-4 border border-[var(--secondary-color)] rounded-xl flex items-center gap-1 text-[var(--neutral-900)]"
        >
          <LockReset /> Reset Preferences
        </button>
      </div>
    </div>
  );
};
