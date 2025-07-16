import { EmptyViewType } from "../../types/book";
import { EmptyView } from "../../components/common/EmptyView";
import emptyImg from "../../assets/coming-soon.svg";

export const AnalyticsPage = () => {
  const statsData = [];
  const overviewEmpty: Record<keyof EmptyViewType, string> = {
    title: "Coming Soon...",
    description:
      "Analytics and reports to help you track and manage your inventory are on the way.",
    image: emptyImg,
    id: "analytics",
  };
  if (statsData.length === 0) return <EmptyView data={overviewEmpty} />;

  return <section className="max-w-screen-2xl w-full mx-auto"></section>;
};
