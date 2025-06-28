import { SyncLoaderWrapper } from "../components/common/Loaders";
import { useBookProvider } from "../context/BookContext";
import { BookPage } from "./BookPage";

export const Dashboard = () => {
  const { uiState } = useBookProvider();
  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <section className="w-full flex-col items-start">
      <BookPage />
    </section>
  );
};
