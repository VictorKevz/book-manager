import { ColorLens, ManageAccounts, Security } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { TabKey } from "../../types/settings";
import { PreferenceTab } from "./PreferenceTab";
import { AccountTab } from "./account/AccountTab";
import { PasswordTab } from "./PasswordTab";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../hooks/useUserDataFetch";
import { SyncLoaderWrapper } from "../../components/common/Loaders";

const tabsNavData = [
  { id: "account", text: "Account", icon: ManageAccounts },
  { id: "preference", text: "Preferences", icon: ColorLens },
  { id: "password", text: "Password", icon: Security },
];

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("account");
  const [isLoading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const createProfileIfMissing = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!data) {
        await supabase.from("profiles").insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "",
            avatar_url: null,
            phone: null,
            country: null,
            bio: null,
          },
        ]);
      }
      setLoading(false);
    };

    createProfileIfMissing();
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  }

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
                  className={`h-10 flex justify-center gap-1 px-3 rounded-t-lg ${
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

        {activeTab === "account" && <AccountTab />}
        {activeTab === "preference" && <PreferenceTab />}
        {activeTab === "password" && <PasswordTab />}
      </article>
    </section>
  );
};
