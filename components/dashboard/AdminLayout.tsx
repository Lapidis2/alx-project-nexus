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
	<div className="flex min-h-screen w-full">

	{/* Sidebar */}
	<aside className="hidden lg:flex fixed lg:relative w-64 bg-primary text-white">
	  <Sidebar role={user?.role ?? 'guest'} />
	</aside>
  
	{/* Main Area */}
	<div className="flex flex-col flex-1 lg:ml-64 min-h-screen">
  
	  {/* Header */}
	  <div className="w-full">
		<AdminHeader />
	  </div>
  
	  {/* Main Content */}
	  <main className="flex-grow px-4 py-6 bg-gray-100">
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
