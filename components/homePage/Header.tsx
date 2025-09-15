import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import Logo from "@/public/assets/images/logo1.png";
import profileIcon from "@/public/assets/images/profile.png";
import Bag from "@/public/assets/images/Bag.svg";
import LogoutIcon from "@/public/assets/images/logout.svg";

interface User {
  name: string;
  email: string;
  role: "buyer" | "vendor";
  profile: string;
}

const Header = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [darkMode, setDarkMode] = useState(false);

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { t } = useTranslation();

  const [user, setUser] = useState<User | null>(null); // null means guest

  useEffect(() => {
  
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("lang");
      if (savedLang) setSelectedLanguage(savedLang);

      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      setDarkMode(savedDarkMode);
      document.documentElement.classList.toggle("dark", savedDarkMode);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(e.target as Node)
      )
        setIsLanguageDropdownOpen(false);

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      )
        setIsUserDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  // Navigation links depending on user role
  const navLinks = [
    { label: t("Home"), href: "/" },
    { label: t("About Us"), href: "/#about-us" },
    { label: t("Products"), href: "/products" },
    { label: t("Contact"), href: "/#contact-us" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-primary border-b-2 border-border font-outfit text-white px-6 py-4 flex items-center justify-between">
      {/* Logo & Navigation */}
      <div className="flex items-center gap-8">
        <Link href="/" aria-label="Homepage">
          <Image src={Logo} alt="Logo" width={120} height={48} />
        </Link>
        <nav className="hidden lg:block" aria-label="Main Navigation">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* User & Language Section */}
      <div className="hidden lg:flex items-center gap-6">
        {user ? (
          // Logged in user dropdown
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2"
              aria-haspopup="true"
              aria-expanded={isUserDropdownOpen}
            >
              <Image
                src={user.profile}
                alt="User Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span
                className={`transition-transform ${
                  isUserDropdownOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-[#012F5A] rounded-lg shadow-lg border border-[#ffffff3e] z-50">
                <div className="p-4 bg-[#0E3F6D] rounded-t-lg flex items-center gap-4">
                  <Image
                    src={user.profile}
                    alt="profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-gray-200">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col p-4 gap-4">
                  <button
                    onClick={() =>
                      router.push(user.role === "vendor" ? "/vendor" : "/buyer")
                    }
                    className="flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Image src={profileIcon} alt="Profile Icon" width={20} height={20} />
                    {t("Profile")}
                  </button>
                  {user.role === "vendor" && (
                    <button
                      onClick={() => router.push("/sellerDashboard")}
                      className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <Image src={Bag} alt="Bag Icon" width={20} height={20} />
                      {t("My Shop")}
                    </button>
                  )}
                  <button
                    className="flex items-center gap-2 hover:scale-105 transition-transform"
                    onClick={() => setUser(null)}
                  >
                    <Image src={LogoutIcon} alt="Logout Icon" width={20} height={20} />
                    {t("Logout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Guest buttons
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-primary transition"
            >
              {t("Login")}
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-white text-primary rounded hover:bg-gray-200 transition"
            >
              {t("Register")}
            </Link>
          </div>
        )}

        {/* Language Dropdown */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center gap-2"
            aria-haspopup="true"
            aria-expanded={isLanguageDropdownOpen}
          >
            {selectedLanguage} ▼
          </button>
          {isLanguageDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-28 bg-primary border border-border rounded shadow-lg">
              {["ENG", "FR", "KINY"].map((lang) => (
                <li key={lang}>
                  <button
                    onClick={() => handleLanguageChange(lang)}
                    className="block w-full px-4 py-2 text-left hover:scale-105 transition-transform"
                  >
                    {lang}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`w-12 h-6 rounded-full p-1 border ${
            darkMode ? "bg-black" : "bg-white"
          }`}
          aria-label="Toggle Dark Mode"
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-all ${
              darkMode ? "ml-auto" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center gap-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-primary text-white p-6 flex flex-col gap-4 lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-200">
              {link.label}
            </Link>
          ))}
          {!user && (
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/login" className="hover:text-gray-200">{t("Login")}</Link>
              <Link href="/register" className="hover:text-gray-200">{t("Register")}</Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
