import {
  ColorLens,
  DarkMode,
  DevicesOther,
  FontDownload,
  GTranslate,
  LightMode,
  LockReset,
  ManageAccounts,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../types/settings";
import { useAlertProvider } from "../../context/AlertContext";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("colorTheme");
  const { theme, onThemeUpdate } = useTheme();
  const { onShowAlert } = useAlertProvider();

  const handleReset = () => {
    onThemeUpdate("system");
    onShowAlert({
      message: "Theme applied successfully",
      type: "success",
      visible: true,
    });
  };
  const tabsData = [
    { id: "accountInfo", text: "Account Info", icon: ManageAccounts },
    { id: "colorTheme", text: "Color Theme", icon: ColorLens },
    { id: "fontTheme", text: "Font Style", icon: FontDownload },
    { id: "language", text: "Language", icon: GTranslate },
  ];

  const colorThemeData = [
    {
      mode: "light",
      label: "Light Mode",
      icon: LightMode,
      description: "Clean and minimal white-based layout",
    },
    {
      mode: "dark",
      label: "Dark Mode",
      icon: DarkMode,
      description: "Low-glare layout for dark environments",
    },
    {
      mode: "system",
      label: "System Default",
      icon: DevicesOther,
      description: "Follows your device’s current theme",
    },
  ];
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
          {tabsData.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={` h-10 flex justify-center gap-1 px-3 rounded-t-lg ${
                    isActive
                      ? "bg-[var(--secondary-color)] text-black"
                      : "bg-[var(--neutral-100)] text-[var(--neutral-900)]"
                  }`}
                >
                  <tab.icon />{" "}
                  <span className="hidden md:block">{tab.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {activeTab === "colorTheme" && (
          <div className="max-w-screen-lg w-full flex flex-col items-start gap-5 mt-6 place-items-center">
            <div className="flex flex-col items-start">
              <h2 className="text-xl">Color Theme</h2>
              <p>Pick your preferred color theme</p>
            </div>
            <div className="w-full flex items-center justify-between gap-5">
              {colorThemeData.map((obj) => {
                const isActive = obj.mode === theme;
                return (
                  <li key={obj.mode}>
                    <button
                      type="button"
                      onClick={() => onThemeUpdate(obj.mode as Theme)}
                      className={`w-full border px-4 py-6  rounded-lg flex-col justify-between hover:bg-[var(--neutral-200)] ${
                        isActive
                          ? "border-[var(--secondary-color)] bg-[var(--neutral-300)]"
                          : "border-[var(--neutral-100)]"
                      }`}
                    >
                      <span className="h-20 w-20 flex items-center justify-center my-5 text-[var(--neutral-700)] border border-[var(--neutral-100)] rounded-xl">
                        <obj.icon fontSize="large" />
                      </span>
                      <h3 className="text-lg">{obj.label}</h3>
                      <p className="text-sm mb-3">{obj.description}</p>

                      {isActive ? (
                        <RadioButtonChecked className="text-[var(--primary-color)]" />
                      ) : (
                        <RadioButtonUnchecked className="text-[var(--neutral-700)]" />
                      )}
                    </button>
                  </li>
                );
              })}
            </div>
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="h-12 w-fit px-4 bg-[var(--primary-color)] rounded-xl gap-1 text-white"
              >
                <LockReset /> Reset Theme
              </button>
            </div>
          </div>
        )}
      </article>
    </section>
  );
};
