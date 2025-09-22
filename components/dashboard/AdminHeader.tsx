"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// Example SVG component (replace with your actual SVG if different)
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
    avatar?: string;
  };
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="w-full bg-white shadow-md px-4 py-2 flex items-center justify-between">
      {/* Left / Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/admin">
          <span className="text-xl font-bold text-gray-800">AdminPanel</span>
        </Link>
      </div>

      {/* Right / User Info */}
      <div className="flex items-center space-x-4">
        {/* Notification SVG */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon />
        </button>

        {/* User Avatar & Name */}
        <div className="hidden lg:flex items-center space-x-2 bg-gray-100 rounded-lg py-1 px-4 xl:mr-2">
          <div className="bg-secondary rounded-full p-2 flex items-center justify-center h-8 w-8 text-white">
            <span className="text-xs font-medium">
              {`${userData?.name}`
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{userData?.name}</span>
            <span className="text-xs text-gray-500">{t("Administrator")}</span>
          </div>
        </div>

        {/* Dropdown menu toggle */}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-md p-2 flex flex-col space-y-2 lg:hidden">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/sellers">Sellers</Link>
          <Link href="/admin/analytics">Analytics</Link>
          <Link href="/admin/settings">Settings</Link>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
