import {
  AddCircle,
  Code,
  DarkMode,
  DevicesOther,
  FontDownload,
  FormatUnderlined,
  LightMode,
  LockReset,
  RadioButtonChecked,
  RadioButtonUnchecked,
  RemoveCircle,
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
  const [accordion, setAccordion] = useState(["theme"]);
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
  const updateAccordion = (preference: PreferenceKey) => {
    setAccordion((prev) => {
      const isExisting = prev.some((pref) => pref === preference);
      if (isExisting) {
        return prev.filter((pref) => pref !== preference);
      }
      return [...prev, preference];
    });
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
          description: "Bright layout",
        },
        {
          value: "dark",
          label: "Dark Mode",
          icon: DarkMode,
          description: "Dark layout",
        },
        {
          value: "system",
          label: "System",
          icon: DevicesOther,
          description: "Same as device",
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
    <section className="w-full mx-auto my-6 max-w-screen-lg">
      <h2 className="text-3xl text-center">Manage Preferences</h2>
      <div className="w-full flex flex-col gap-10 border border-[var(--neutral-100)] rounded-xl py-5 mt-6">
        {preferences.map((pref, i) => {
          const isOpen = accordion.includes(pref.type);
          return (
            <div
              key={pref.type}
              className={`w-full flex flex-col px-4 ${
                i !== 0 && "border-t border-[var(--neutral-100)]"
              }`}
            >
              <header
                className={`w-full flex items-start justify-between gap-6 cursor-pointer ${
                  isOpen ? "py-5" : "py-3"
                }`}
                onClick={() => updateAccordion(pref.type)}
              >
                <div>
                  <h3 className="text-xl font-semibold">{pref.title}</h3>
                  <p className="">{pref.description}</p>
                </div>
                <span
                  className={`scale-130 ${
                    isOpen
                      ? "text-[var(--secondary-color)]"
                      : "text-[var(--neutral-900)]"
                  }`}
                >
                  {isOpen ? <RemoveCircle /> : <AddCircle />}
                </span>
              </header>
              {isOpen && (
                <div className="grid md:grid-cols-3 gap-4  w-full">
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
                        className={`w-full justify-between border px-4 py-3 rounded-lg hover:bg-[var(--neutral-200)] ${
                          isActive
                            ? "border-[var(--secondary-color)] bg-[var(--neutral-300)]"
                            : "border-[var(--neutral-100)]"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {pref.type === "language" &&
                          typeof item.icon === "string" ? (
                            <img
                              src={item.icon}
                              className="h-auto w-18 rounded-xl bg-[var(--neutral-100)] px-2"
                              alt=""
                            />
                          ) : (
                            <span className="h-10 w-10 flex items-center justify-center text-[var(--neutral-700)] border bg-[var(--neutral-400)] rounded-lg">
                              <item.icon fontSize="medium" />
                            </span>
                          )}
                          <span className="flex flex-col items-start">
                            <h3 className="text-lg">{item.label}</h3>
                            <p className="text-sm -mt-1">{item.description}</p>
                          </span>
                        </span>
                        <span>
                          {isActive ? (
                            <RadioButtonChecked className="text-[var(--primary-color)]" />
                          ) : (
                            <RadioButtonUnchecked className="text-[var(--neutral-700)]" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end pl  -4 mt-6">
        <button
          type="button"
          onClick={handleReset}
          className="h-12 font-semibold w-fit px-4 border border-transparent bg-[var(--neutral-100)] rounded-xl flex items-center gap-1 text-[var(--neutral-900)] hover:bg-[var(--primary-color)] hover:text-black/90"
        >
          <LockReset /> Reset Preferences
        </button>
      </div>
    </section>
  );
};
