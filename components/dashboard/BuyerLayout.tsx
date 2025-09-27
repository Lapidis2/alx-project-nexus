import React, { ReactNode } from "react";
import BuyerHeader from "@/components/dashboard/headers/BuyerHeader";
import BuyerSide from "@/components/dashboard/sidebar/BuyerSide";
import DashFooter from "@/components/dashboard/DashFooter";
import ProtectedRoute from "../auth/ProtectedRoutes";
interface AdminLayoutProps {
  children: ReactNode;
}

const BuyerLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="w-full min-h-screen flex flex-row">
        <div className="hidden lg:flex lg:w-[15%] relative">
          <BuyerSide />
        </div>

        <div className="flex flex-col flex-1">
          <BuyerHeader />

          <main className="flex-grow p-4 bg-gray-100 pt-[10vh]">
            {children}
          </main>

          <DashFooter />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BuyerLayout;
