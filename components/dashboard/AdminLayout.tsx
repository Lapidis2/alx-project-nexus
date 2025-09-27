import React, { ReactNode } from "react";
import AdminHeader from "@/components/dashboard/headers/AdminHeader";
import Sidebar from "@/components/dashboard/sidebar/SideBar";
import DashFooter from "@/components/dashboard/DashFooter";
import { useAuthUser } from 'react-auth-kit';
import ProtectedRoute from "../auth/ProtectedRoutes";
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const auth = useAuthUser();
  const user = auth();

  return (
	<ProtectedRoute allowedRoles={["admin"]}>
<div className="w-full min-h-screen bg-gray-100 flex">

<aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-primary text-white z-50">
  <Sidebar role={user?.role ?? 'guest'} />
</aside>


<div className="flex flex-col w-full min-h-screen lg:ml-64">
 
   <AdminHeader /> 

  <main className="flex-grow px-4 py-6">
	{children}
  </main>

 
  <DashFooter /> 
</div>
</div>




	</ProtectedRoute>
  )

};

export default AdminLayout;
