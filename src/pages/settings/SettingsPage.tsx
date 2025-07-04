import {
  Code,
  ColorLens,
  DarkMode,
  DevicesOther,
  FontDownload,
  FormatUnderlined,
  GTranslate,
  LightMode,
  ManageAccounts,
} from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Font,
  fontMap,
  Language,
  SettingsTabKey,
  TabDataType,
  TabKey,
  TabsHeadingData,
  TabValue,
  Theme,
} from "../../types/settings";
import { useAlertProvider } from "../../context/AlertContext";
import { SettingsTab } from "./SettingsTab";
import fi from "../../assets/finland.png";
import uk from "../../assets/uk.png";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("color");
  const { theme, onThemeUpdate } = useTheme();
  const { onShowAlert } = useAlertProvider();
  const [font, setFont] = useState<Font>("modern");
  const [language, setLanguage] = useState<Language>("en");

  const onTabUpdate = useCallback(
    (value: TabValue) => {
      if (activeTab === "color") {
        onThemeUpdate(value as Theme);
      } else if (activeTab === "font") {
        setFont(value as Font);
        localStorage.setItem("font", value);
        document.documentElement.style.setProperty(
          "--app-font",
          fontMap[value as Font]
        );
      } else if (activeTab === "language") {
        setLanguage(value as Language);
      }
    },
    [activeTab, onThemeUpdate]
  );
  const fontReset = () => {
    setFont("modern");
    localStorage.setItem("font", JSON.stringify(font));
    document.documentElement.style.setProperty("--app-font", fontMap["modern"]);
  };
  const handleTabReset = () => {
    onThemeUpdate("system");
    setLanguage("en");
    fontReset();
    setActiveTab("color");
    onShowAlert({
      message: "Settings applied successfully",
      type: "success",
      visible: true,
    });
  };
  useEffect(() => {
    const saved = (localStorage.getItem("font") as Font) || "modern";
    setFont(saved);
    document.documentElement.style.setProperty("--app-font", fontMap[saved]);
  }, []);
  const tabsNavData = [
    { id: "account", text: "Account Info", icon: ManageAccounts },
    { id: "color", text: "Color Theme", icon: ColorLens },
    { id: "font", text: "Font Style", icon: FontDownload },
    { id: "language", text: "Language", icon: GTranslate },
  ];

  const tabsHeadingData: TabsHeadingData = {
    color: {
      title: "Theme Preferences",
      description: "Switch between light, dark, or system mode",
    },
    font: {
      title: "Font Style",
      description: "Choose your preferred typography style",
    },
    language: {
      title: "Language Settings",
      description: "Set your app language preference",
    },
    account: {
      title: "Account Information",
      description: "View and manage your account details",
    },
  };

  const settingsTabData: Record<SettingsTabKey, TabDataType[]> = {
    color: [
      {
        value: "light",
        label: "Light Mode",
        icon: LightMode,
        description: "Clean and minimal white-based layout",
      },
      {
        value: "dark",
        label: "Dark Mode",
        icon: DarkMode,
        description: "Low-glare layout for dark environments",
      },
      {
        value: "system",
        label: "System Default",
        icon: DevicesOther,
        description: "Follows your device’s current theme",
      },
    ],
    font: [
      {
        value: "modern",
        label: "Modern",
        icon: FontDownload,
        description: "Clean sans-serif for a modern look",
      },
      {
        value: "classic",
        label: "Classic",
        icon: FormatUnderlined,
        description: "Serif font with a formal style",
      },
      {
        value: "code",
        label: "Code",
        icon: Code,
        description: "Monospace font for developer feel",
      },
    ],
    language: [
      {
        value: "en",
        label: "English",
        icon: uk,
        description: "Set app language to English",
      },
      {
        value: "fi",
        label: "Finnish",
        icon: fi,
        description: "Set app language to Finnish",
      },
    ],
  };

  const state: Record<SettingsTabKey, Theme | Font | Language> = {
    color: theme,
    font,
    language,
  };
  return (
    <section className="w-full flex flex-col mx-auto">
      <header className="w-full pb-4">
        <h2 className="text-3xl">Settings</h2>
        <p className="text-[var(--neutral-700)]">
          Customize your preferences and account options
        </p>
      </header>
      <article className="w-full flex flex-col items-start gap-5 mx-auto">
        <ul className="w-full flex justify-start items-center gap-5 border-b border-[var(--neutral-100)]">
          {tabsNavData.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={` h-10 flex justify-center gap-1 px-3 rounded-t-lg ${
                    isActive
                      ? "bg-[var(--secondary-color)] text-black"
                      : "bg-[var(--neutral-100)] text-[var(--neutral-900)]"
                  }`}
                >
                  <tab.icon />
                  <span className="hidden md:block">{tab.text}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {activeTab === "account" ? (
          <div>Account Info Tab!!!</div>
        ) : (
          <SettingsTab
            data={settingsTabData[activeTab]!}
            selectedValue={state[activeTab as SettingsTabKey]}
            onUpdate={onTabUpdate}
            title={tabsHeadingData[activeTab].title}
            description={tabsHeadingData[activeTab].description}
            onReset={handleTabReset}
            activeTab={activeTab}
          />
        )}
      </article>
    </section>
  );
};
