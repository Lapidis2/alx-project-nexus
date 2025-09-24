import React, { ReactNode } from "react";
import SellerHeader from "@/components/dashboard/headers/SellerHeader";
import SellerSide from "@/components/dashboard/sidebar/SellerSide";
import DashFooter from "@/components/dashboard/DashFooter";

interface AdminLayoutProps {
  children: ReactNode;
}

const SellerLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	return (
	  <div className="w-full min-h-screen flex flex-row">
		{/* SellerSide */}
		<div className="hidden lg:flex lg:w-[15%] relative">
		  <SellerSide />
		</div>
  
		{/* Right section */}
		<div className="flex flex-col flex-1">
		  {/* Header */}
		  <SellerHeader />
  
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
  
export default SellerLayout;
