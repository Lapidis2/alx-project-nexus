"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Board from "@/public/assets/images/board.png";
import Logo from "@/public/assets/images/logo1.png";
import Bag from "@/public/assets/images/Bag.svg";
import LogoutIcon from "@/public/assets/images/logout.svg";
import profileIcon from "@/public/assets/images/profile.png";
import { useHandleLogout } from "@/services/Logout";
import { Circles } from "react-loader-spinner";
import { getUserFromToken } from "@/utils/auth";

interface User {
  userId: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
  profile: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  userId: string;
  email: string;
  items: CartItem[];
}

const Header: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { handleLogout, loading } = useHandleLogout();

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
    setIsUserDropdownOpen(false);
    router.push("/");
  };


  useEffect(() => {
    const loadUser = async () => {
      const tokenUser = getUserFromToken();

      if (!tokenUser) {
        setIsAuthChecked(true);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://umurava-challenge-bn.onrender.com/api/getSingleUser/${tokenUser.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch user");

        const fullUser: User = await res.json();
        setUser(fullUser);
      } catch (err) {
        console.error(err);
      } finally {
        setIsAuthChecked(true);
      }
    };

    loadUser();
  }, []);


  useEffect(() => {
	const fetchCart = async () => {
	  try {
		const token = localStorage.getItem("token");
		if (!token) return;
  
		const res = await fetch("/api/cart", {
		  method: "GET",
		  headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		  },
		});
  
		if (!res.ok) {
		  console.error("Failed to fetch cart");
		  return;
		}
  
		const data: Cart = await res.json();
  

		const total = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
		setCartCount(total);
	  } catch (error) {
		console.error("Failed to fetch cart:", error);
	  }
	};
  
	fetchCart();
  }, []);
  

  
  if (!isAuthChecked) {
    return (
      <header className="fixed top-0 w-full h-24 z-50 bg-primary text-white flex items-center justify-center border-b border-border">
        <Circles height={40} width={40} color="#C9974C" />
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full h-24 z-50 bg-primary text-white px-6 py-4 flex items-center justify-between border-b border-border">

      <div className="flex items-center gap-8">
        <Link href="/" aria-label="Homepage">
          <Image src={Logo} alt="Logo" width={120} height={48}  />
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex gap-8">
            <li>
              <Link href="/">{t("Home")}</Link>
            </li>
            <li>
              <Link href="/#about-us">{t("About Us")}</Link>
            </li>
            <li>
              <Link href="/products">{t("Products")}</Link>
            </li>
            <li>
              <Link href="/#contact-us">{t("Contact")}</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Image src={Bag} alt="Cart" width={28} height={28} />
              <span className="absolute -top-2 -right-2 bg-secondary text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2"
              >
                <Image
                  src={user.profile || profileIcon}
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
                    <Image
                      src={user.profile || profileIcon}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-300">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col p-4 gap-3">
                    <button
                      onClick={() => router.push(`/buyer/profile/${user.userId}`)}
                      className="flex items-center gap-2"
                    >
                      <Image src={profileIcon} alt="Profile Icon" width={20} height={20} />
                      {t("Profile")}
                    </button>
                    <button
                      onClick={() => router.push(`/buyer/profile/${user.userId}`)}
                      className="flex items-center gap-2"
                    >
                      <Image src={Board} alt="My Order" width={20} height={20} />
                      {t("My Order")}
                    </button>
                    <button
                      onClick={onLogout}
                      disabled={loading}
                      className="flex items-center gap-2 text-red-400"
                    >
                      {loading ? (
                        <Circles height={20} width={20} color="#C9974C" />
                      ) : (
                        <Image src={LogoutIcon} alt="Logout Icon" width={20} height={20} />
                      )}
                      {t("Logout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-white text-primary rounded hover:bg-gray-200 transition"
            >
              {t("Login")}
            </Link>
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
