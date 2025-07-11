import { Outlet } from "react-router-dom";

import { TopHeader } from "../components/TopHeader";
import { SideBar } from "../components/common/Sidebar";

export const Dashboard = () => {
  return (
    <>
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Sidebar + Main Content Wrapper */}
      <div className="flex pt-[5rem] min-h-screen w-full">
        {/* Fixed Sidebar */}
        <SideBar />

        {/* Page Content */}
        <main className="flex-1 xl:ml-[6rem] px-4 pb-[6rem] mt-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};
