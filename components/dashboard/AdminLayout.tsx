import React, { ReactNode } from "react";
import AdminHeader from "@/components/dashboard/headers/AdminHeader";
import Sidebar from "@/components/dashboard/sidebar/SideBar";
import DashFooter from "@/components/dashboard/DashFooter";
import { useAuthUser } from 'react-auth-kit';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const auth = useAuthUser();
  const user = auth();

  return (
    <div className="w-full min-h-screen flex">
      {/* Sidebar (15%) */}
      <aside className="w-[15%] min-h-screen hidden lg:flex relative">
        <Sidebar role={user?.role ?? 'guest'} />
      </aside>

      {/* Main Area (85%) */}
      <div className="w-[85%] flex flex-col min-h-screen">
        {/* Header */}
        <div className="w-full">
          <AdminHeader />
        </div>

        {/* Main content */}
        <main className="flex-grow p-4 bg-gray-100 pt-[10vh] pb-[6vh]">
          {children}
        </main>

        {/* Footer */}
        <div className="w-full">
          <DashFooter />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
