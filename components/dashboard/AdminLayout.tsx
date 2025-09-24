import React, { ReactNode } from "react";
import AdminHeader from "@/components/dashboard/headers/AdminHeader";
import Sidebar from "@/components/dashboard/sidebar/SideBar";
import DashFooter from "@/components/dashboard/DashFooter";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	return (
	  <div className="w-full min-h-screen flex flex-row">
	
		<div className="hidden lg:flex lg:w-[15%] relative">
		  <Sidebar />
		</div>
  
		{/* Right section */}
		<div className="flex flex-col flex-1">
		  {/* Header */}
		  <AdminHeader />
  
		  {/* Main content */}
		  <main className="flex-grow p-4 bg-gray-100 pt-[10vh]">
			{children}
		  </main>
  
		  {/* Footer */}
		  <DashFooter />
		</div>
	  </div>
	);
  };
  
export default AdminLayout;
