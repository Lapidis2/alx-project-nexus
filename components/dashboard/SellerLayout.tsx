import React, { ReactNode } from "react";
import SellerHeader from "@/components/dashboard/headers/SellerHeader";
import SellerSide from "@/components/dashboard/sidebar/SellerSide";
import DashFooter from "@/components/dashboard/DashFooter";

interface AdminLayoutProps {
  children: ReactNode;
}

const SellerLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	return (
	  <div className="w-full min-h-screen flex ">
		{/* SellerSide */}
		<div className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-primary text-white z-50">
		  <SellerSide />
		</div>
  
		{/* Right section */}
		<div className="flex flex-col w-full min-h-screen lg:ml-64">
		  {/* Header */}
		  <SellerHeader />
  
		  {/* Main content */}
		  <main className="flex-grow px-4 py-6 mt-20">
			{children}
		  </main>
  
		  {/* Footer */}
		  <DashFooter />
		</div>
	  </div>
	);
  };
  
export default SellerLayout;
