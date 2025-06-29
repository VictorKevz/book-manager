import { Outlet } from "react-router-dom";
import { SyncLoaderWrapper } from "../components/common/Loaders";
import { useBookProvider } from "../context/BookContext";
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
    <>
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Sidebar + Main Content Wrapper */}
      <div className="flex pt-[5rem] min-h-screen">
        {/* Fixed Sidebar */}
        <SideBar />

        {/* Page Content */}
        <main className="flex-1 ml-[11rem] p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};
