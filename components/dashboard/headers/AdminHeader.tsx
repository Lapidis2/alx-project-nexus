"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation"; 
import { useHandleLogout } from "@/services/Logout";
import { Circles } from "react-loader-spinner";

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
    avatar?: string | null;
  };
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { handleLogout, loading: logoutLoading } = useHandleLogout();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (href: string) => {
    setIsLoading(true);
    router.push(href);
  };

  return (
    <header className="fixed top-0 lg:ml-64 right-0 w-full lg:w-[calc(100%-16rem)] bg-white shadow-md px-4 py-2 flex items-center justify-between z-50">

      <div className="flex items-center space-x-2 lg:hidden">
        <Link href="/admin">
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
            <span className="text-xs text-secondary">{t("ADMIN")}</span>
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
                onClick={handleLogout}
                disabled={logoutLoading}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {logoutLoading ? (
                  <div className="flex items-center gap-2">
                    <Circles visible height="20" width="20" color="#C9974C" />
                    Logging out...
                  </div>
                ) : (
                  "Logout"
                )}
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

      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-md p-2 flex flex-col space-y-2 lg:hidden">
          <Link href="/admin" onClick={() => handleNavigation("/admin")}>Dashboard</Link>
          <Link href="/admin/users" onClick={() => handleNavigation("/admin/users")}>Users</Link>
          <Link href="/admin/sellers" onClick={() => handleNavigation("/admin/sellers")}>Sellers</Link>
          <Link href="/admin/requests" onClick={() => handleNavigation("/admin/requests")}>Requests</Link>
          <Link href="/admin/products" onClick={() => handleNavigation("/admin/products")}>Products</Link>
          <Link href="/admin/sales" onClick={() => handleNavigation("/admin/sales")}>Sales</Link>
          <Link href="/admin/analytics" onClick={() => handleNavigation("/admin/analytics")}>Analytics</Link>
          <Link href="/admin/settings" onClick={() => handleNavigation("/admin/settings")}>Settings</Link>
        </div>
      )}

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-50 bg-opacity-50 flex justify-center items-center z-50">
          <Circles visible height="50" width="50" color="#C9974C" />
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
