"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { Home, Users, Store, Settings } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode; // ✅ works with Next.js & TS
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: <Home size={20} /> },
  { id: "users", label: "Users", href: "/users", icon: <Users size={20} /> },
  { id: "sellers", label: "Sellers", href: "/sellers", icon: <Store size={20} /> },
  { id: "settings", label: "Settings", href: "/settings", icon: <Settings size={20} /> },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="flex">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-700">Admin Panel</h1>
        </div>

        <ul className="p-4 space-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {item.icon}
                <span className="text-gray-700">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </aside>
  );
};

export default Sidebar;
