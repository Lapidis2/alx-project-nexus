"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const BellIcon = () => (
  <svg
	xmlns="http://www.w3.org/2000/svg"
	className="h-5 w-5 text-gray-600"
	viewBox="0 0 20 20"
	fill="currentColor"
  >
	<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
  </svg>
);

interface AdminHeaderProps {
  userData?: {
	name?: string;
	avatar?: string|null; 
  };
}

const BuyerHeader: React.FC<AdminHeaderProps> = ({ userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
	<header className="fixed top-0 left-0 lg:left-80 w-full lg:w-[calc(100%-20rem)] 
			 bg-white shadow-md px-4 py-2 flex items-center justify-between 
			 z-50 transition-all">
 
	  <div className="flex items-center space-x-2 lg:hidden">
		<Link href="/buyer">
		  <span className="text-xl font-bold text-gray-800">AdminPanel</span>
		</Link>
	  </div>

	  <div className="flex-1 max-w-md mx-4 hidden md:flex">
		<div className="relative w-full">
		  <input
			type="text"
			placeholder="Search..."
			className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		  />
		  {/* Search icon inside input */}
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		  >
			<path
			  strokeLinecap="round"
			  strokeLinejoin="round"
			  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
			/>
		  </svg>
		</div>
	  </div>



	  <div className="flex items-center space-x-4">
	   
		<button className="p-2 rounded-full hover:bg-gray-100">
		  <BellIcon />
		</button>

	  
		<div className="flex items-center relative">
   
		  <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300">
			<Image
			  src={userData?.avatar || "/assets/images/profile.png"} 
			  alt="User Avatar"
			  width={40}
			  height={40}
			  className="object-cover"
			/>
		  </div>

	  
		  <div className="flex flex-col ml-2">
			<span className="text-xs text-secondary">{t("BUYER")}</span>
		  </div>

		
		  <button
			className="ml-2 p-1 rounded-full hover:bg-gray-100"
			onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
		  >
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  className="h-4 w-4 text-gray-600"
			  fill="none"
			  viewBox="0 0 24 24"
			  stroke="currentColor"
			  strokeWidth={2}
			>
			  <path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19 9l-7 7-7-7"
			  />
			</svg>
		  </button>

		  {isUserMenuOpen && (
			<div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40 py-2 z-50">
			  <Link
				href="/admin/settings"
				className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
			  >
				Profile
			  </Link>
			  <button
				onClick={() => console.log("Logout clicked")}
				className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
			  >
				Logout
			  </button>
			</div>
		  )}
		</div>

	   
		<button
		  className="lg:hidden p-2 rounded-full hover:bg-gray-100"
		  onClick={() => setIsMenuOpen(!isMenuOpen)}
		>
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-5 w-5 text-gray-600"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		  >
			<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
		  </svg>
		</button>
	  </div>

	  {/* Mobile dropdown */}
	  {isMenuOpen && (
		<div className="absolute top-16 right-4 bg-white shadow-md rounded-md p-2 flex flex-col space-y-2 lg:hidden">
		  <Link href="/buyer">Dashboard</Link>
		  <Link href="/buyer/orders">My Orders</Link>
		  <Link href="/buyer/analytics">Analytics</Link>
		  <Link href="/buyer/settings">Settings</Link>
		</div>
	  )}
	</header>
  );
};

export default BuyerHeader;
