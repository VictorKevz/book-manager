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
      <div className="flex pt-[5rem] min-h-screen w-full">
        {/* Fixed Sidebar */}
        <SideBar />

        {/* Page Content */}
        <main className="flex-1 xl:ml-[6rem] px-6 pb-[6rem] mt-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};
