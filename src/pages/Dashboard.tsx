import { Route, Routes } from "react-router-dom";
import { SyncLoaderWrapper } from "../components/common/Loaders";
import { useBookProvider } from "../context/BookContext";
import { BookPage } from "./BookPage";
import { TopHeader } from "../components/TopHeader";
import { SideBar } from "../components/common/Sidebar";

export const Dashboard = () => {
  const { uiState } = useBookProvider();
  if (uiState.isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-dvh">
        <SyncLoaderWrapper />
      </div>
    );
  return (
    <section className="w-full flex-col items-start h-full">
      <TopHeader />
      <div className="w-full flex items-start mt-[5rem] h-full">
        <Routes>
          <Route index element={<BookPage />} />
        </Routes>
        <SideBar />
      </div>
    </section>
  );
};
