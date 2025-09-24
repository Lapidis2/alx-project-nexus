
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router

import { FaTachometerAlt, FaUsers, FaUserShield, FaClipboardList, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";

interface NavLink {
  id: string;
  label: string;
  location: string;
  icon: React.JSX.Element;
}

const BuyerSide = () => {
  const router = useRouter();
  const [active, setActive] = useState<string>("001");

  const Navlinks: NavLink[] = [
	{ id: "001", label: "Dashboard", location: "/buyer", icon: <FaTachometerAlt /> },
	{ id: "002", label: "My Orders", location: "/buyer/orders", icon: <FaUsers /> },
	{ id: "003", label: "Requests", location: "/buyer/requests", icon: <FaClipboardList /> },
	{ id: "004", label: "Analytics", location: "/buyer/analytics", icon: <FaChartLine /> },
	{ id: "005", label: "Settings", location: "/buyer/settings", icon: <FaCog /> },
  ];

  const handleNavigate = (link: NavLink) => {
	setActive(link.id);
	router.push(link.location);
  };

 

  return (
	<aside className="w-80 hidden lg:flex flex-col fixed gap-6 bg-primary p-6 h-full text-white">
	  {/* Logo */}
	  <div className="text-2xl font-bold mb-10 cursor-pointer" onClick={() => router.push("/admin")}>
		AdminPanel
	  </div>

	  {/* Navigation Links */}
	  <nav className="flex flex-col gap-4 flex-1">
		{Navlinks.map((link) => (
		  <div
			key={link.id}
			onClick={() => handleNavigate(link)}
			className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
			  active === link.id ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
			}`}
		  >
			<span className="text-lg">{link.icon}</span>
			<span className="font-medium">{link.label}</span>
		  </div>
		))}
	  </nav>

	  {/* Logout */}
	  <button
	  onClick={() => alert('logout')}
		className="flex items-center gap-3 p-3 mt-auto rounded-lg hover:bg-red-600 text-red-500 font-medium transition-all"
	  >
		<FaSignOutAlt />
		Logout
	  </button>
	</aside>
  );
};

export default BuyerSide;
