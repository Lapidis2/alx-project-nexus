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
	  <div className="w-full min-h-screen flex flex-row">
	
		<div className="hidden lg:flex lg:w-[15%] relative">
		<Sidebar role={user?.role ?? 'guest'} />
		</div>
  
		<div className="flex flex-col flex-1">
		
		  <AdminHeader />
  
	
		  <main className="flex-grow p-4 bg-gray-100 pt-[10vh]">
			{children}
		  </main>
  
	
		  <DashFooter />
		</div>
	  </div>
	);
  };
  
export default AdminLayout;
