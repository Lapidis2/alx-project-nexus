"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AdminHeader: React.FC = () => {
  const pathname = usePathname();
  const [menuTitle, setMenuTitle] = useState("");

  // Update menu title based on current path
  useEffect(() => {
    switch (pathname) {
      case "/":
        setMenuTitle("Home");
        break;
      case "/about":
        setMenuTitle("About");
        break;
      case "/contact":
        setMenuTitle("Contact");
        break;
      default:
        setMenuTitle("");
    }
  }, [pathname]);

  // Current date/time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* SVG goes here */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <span className="font-bold text-xl">MySite</span>
        </Link>

        {/* Menu Title */}
        <h1 className="text-lg font-medium">{menuTitle}</h1>

        {/* Current Time */}
        <time
          dateTime={currentTime.toISOString()}
          className="text-sm text-gray-600"
        >
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </time>
      </nav>
    </header>
  );
};

export default AdminHeader;
