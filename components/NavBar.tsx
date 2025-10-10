"use client";

import Link from "next/link";
import Image from "next/image";
import profile from "@/public/assets/images/profile.png";

const Navbar = () => {
  return (
    <nav className="w-full bg-primary p-4 md:px-10 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <svg
          width="100"
          height="32"
          viewBox="0 0 100 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-auto"
        >
          {/* SVG paths omitted for brevity */}
        </svg>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 text-white font-medium">
        <li>
          <Link href="/about" className="hover:text-yellow-500 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="/services" className="hover:text-yellow-500 transition-colors">
            Services
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-yellow-500 transition-colors">
            Contact
          </Link>
        </li>
      </ul>

      {/* Profile Image */}
      <div className="flex items-center gap-4">
        <Image
          src={profile}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
          
        />
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white">
        {/* Simple Hamburger Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
