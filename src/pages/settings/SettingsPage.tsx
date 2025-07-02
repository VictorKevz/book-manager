import {
  ColorLens,
  FontDownload,
  GTranslate,
  ManageAccounts,
} from "@mui/icons-material";
import { useState } from "react";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("colorTheme");

  const tabsData = [
    { id: "accountInfo", text: "Account Info", icon: ManageAccounts },
    { id: "colorTheme", text: "Color Theme", icon: ColorLens },
    { id: "fontTheme", text: "Font Style", icon: FontDownload },
    { id: "language", text: "Language", icon: GTranslate },
  ];
  return (
    <section className="w-full flex flex-col mx-auto">
      <header className="w-full pb-4">
        <h2 className="text-3xl">Settings</h2>
      </header>
      <div className="w-full flex flex-col items-start justify-start gap-5">
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
                      ? "bg-[var(--secondary-color)] text-white"
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
      </div>
    </section>
  );
};
