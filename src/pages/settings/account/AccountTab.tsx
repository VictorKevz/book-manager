import { Profile, ProfileForm } from "../../../types/settings";
import { Person } from "@mui/icons-material";
import { useUserDataFetch } from "../../../hooks/useUserDataFetch";
import { greetUser } from "../../../utils/time";
import { AccountForm } from "./AccountForm";
import { useCallback } from "react";

export const AccountTab = () => {
  const { data: profileInfo, fetchData: fetchProfiles } =
    useUserDataFetch<Profile>("profiles", "id");
  const userinfoObj = profileInfo[0];

  const data: ProfileForm = {
    full_name: userinfoObj?.full_name,
    bio: userinfoObj?.bio,
    email: userinfoObj?.email,
    phone: userinfoObj?.phone,
    country: userinfoObj?.country,
    avatar_url: userinfoObj?.avatar_url,
  };
  const refreshProfiles = useCallback(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <section className="w-full flex items-start justify-center gap-10">
      <div className="max-w-screen-lg w-full flex flex-col items-center justify-center py-5 rounded-xl">
        <header className="relative w-full flex flex-col items-center">
          {typeof userinfoObj?.avatar_url === "string" &&
          userinfoObj.avatar_url.trim() !== "" ? (
            <img
              src={userinfoObj.avatar_url}
              className="w-20 h-20 rounded-full border border-[var(--neutral-100)]"
              alt={`Profile picture of ${userinfoObj.full_name}`}
            />
          ) : (
            <span className="w-20 h-20 flex items-center justify-center rounded-full border border-[var(--neutral-100)]">
              <Person className="text-[var(--neutral-900)] scale-120" />
            </span>
          )}
          <h2 className="text-xl mt-2">
            {greetUser((userinfoObj?.full_name as string) ?? "Test")}
          </h2>
          <span className="text-[var(--secondary-color)]">Welcome back</span>
        </header>

        <AccountForm data={data} onRefresh={refreshProfiles} />
      </div>
    </section>
  );
};
