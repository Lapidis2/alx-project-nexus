"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";

import Logo from "@/public/assets/images/logo1.png";
import Bag from "@/public/assets/images/Bag.svg";
import Heart from "@/public/assets/images/heart 1.svg";
import LogoutIcon from "@/public/assets/images/logout.svg";
import profileIcon from "@/public/assets/images/profile.png";

interface User {
  name: string;
  email: string;
  role: "buyer" | "vendor";
  profile: string;
}

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  if (!mounted) {
   
    return null;
  }

  const handleLogin = () => {
    const fakeUser: User = {
      name: "Jean Pierre",
      email: "jean@example.com",
      role: "buyer",
      profile: "/assets/images/profile.png",
    };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-primary text-white px-6 py-4 flex items-center justify-between border-b border-border">
    
      <div className="flex items-center gap-8">
        <Link href="/" aria-label="Homepage">
          <Image src={Logo} alt="Logo" width={120} height={48} priority />
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex gap-8">
            <li><Link href="/">{t("Home")}</Link></li>
            <li><Link href="/#about-us">{t("About Us")}</Link></li>
            <li><Link href="/products">{t("Products")}</Link></li>
            <li><Link href="/#contact-us">{t("Contact")}</Link></li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* Wishlist & Cart */}
            <Link href="/wishlist" className="relative">
              <Image src={Heart} alt="Wishlist" width={28} height={28} />
              <span className="absolute -top-2 -right-2 bg-secondary text-xs px-2 py-0.5 rounded-full">04</span>
            </Link>
            <Link href="/cart" className="relative">
              <Image src={Bag} alt="Cart" width={28} height={28} />
              <span className="absolute -top-2 -right-2 bg-secondary text-xs px-2 py-0.5 rounded-full">04</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2"
              >
                <Image
                  src={user.profile}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{isUserDropdownOpen ? "▲" : "▼"}</span>
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#012F5A] rounded-lg shadow-lg border border-[#ffffff3e]">
                  <div className="p-4 bg-[#0E3F6D] rounded-t-lg flex items-center gap-3">
                    <Image src={user.profile} alt="Profile" width={48} height={48} className="rounded-full" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-300">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col p-4 gap-3">
                    <button onClick={() => router.push("/profile")} className="flex items-center gap-2">
                      <Image src={profileIcon} alt="Profile Icon" width={20} height={20} />
                      {t("Profile")}
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                      <Image src={LogoutIcon} alt="Logout Icon" width={20} height={20} />
                      {t("Logout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-primary transition"
            >
              {t("Login")}
            </button>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-white text-primary rounded hover:bg-gray-200 transition"
            >
              {t("Register")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
