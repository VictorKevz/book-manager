import { EmptyView } from "../../components/common/EmptyView";
import { EmptyViewType } from "../../types/book";
import emptyImg from "../../assets/password.svg";
export const PasswordTab = () => {
  const passwordData = [];
  const overviewEmpty: Record<keyof EmptyViewType, string> = {
    title: "Coming soon...",
    description:
      "We are working on the feature to allow you quickly reset your password. Stay tuned!",
    image: emptyImg,
    id: "password",
  };
  if (passwordData.length === 0) return <EmptyView data={overviewEmpty} />;
  return (
    <h2 className="text-[var(--neutral-900)] text-2xl">Coming soon!!!!</h2>
  );
};
