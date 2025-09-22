
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

const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState<string>("001");

  const Navlinks: NavLink[] = [
    { id: "001", label: "Dashboard", location: "/admin", icon: <FaTachometerAlt /> },
    { id: "002", label: "Users", location: "/admin/users", icon: <FaUsers /> },
    { id: "003", label: "Sellers", location: "/admin/sellers", icon: <FaUserShield /> },
    { id: "004", label: "Requests", location: "/admin/requests", icon: <FaClipboardList /> },
    { id: "005", label: "Analytics", location: "/admin/analytics", icon: <FaChartLine /> },
    { id: "006", label: "Settings", location: "/admin/settings", icon: <FaCog /> },
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

export default Sidebar;
