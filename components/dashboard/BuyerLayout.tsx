import React, { ReactNode } from "react";
import BuyerHeader from "@/components/dashboard/headers/BuyerHeader";
import BuyerSide from "@/components/dashboard/sidebar/BuyerSide";
import DashFooter from "@/components/dashboard/DashFooter";

interface AdminLayoutProps {
  children: ReactNode;
}

const BuyerLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	return (
	  <div className="w-full min-h-screen flex flex-row">
		{/* BuyerSide */}
		<div className="hidden lg:flex lg:w-[15%] relative">
		  <BuyerSide />
		</div>
  
		{/* Right section */}
		<div className="flex flex-col flex-1">
		  {/* Header */}
		  <BuyerHeader />
  
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
  
export default BuyerLayout;
