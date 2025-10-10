import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Logo from "@/public/assets/images/logo1.png";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary font-outfit text-base md:text-xl text-white pt-8 w-full h-auto">
      <section className="container mx-auto px-4 md:px-8 border-b border-border pb-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-description mr-0 md:mr-32">
          <div className="mb-6">
            <Image
              src={Logo}
              alt="JEAN Logo"
              width={150}
              height={48}
              
            />
          </div>
          <p className="font-outfit font-[300]">
            {t(
              "We're here to help buyers and sellers connect in a friendly and trustworthy environment. Join us and explore a world of seamless online shopping!"
            )}
          </p>
        </div>

        <nav
          className="footer-links max-w-full md:max-w-md"
          aria-label="Footer Navigation"
        >
          <h2 className="mb-4 md:mb-10 font-bold">{t("Links")}</h2>
          <ul className="grid grid-cols-2 gap-2">
            <li>
              <Link
                href="/"
                title="Home"
                className="text-white hover:underline"
              >
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                title="Products"
                className="text-white hover:underline"
              >
                {t("Products")}
              </Link>
            </li>
            <li>
              <a href="#AboutJEAN" className="text-white hover:underline">
                {t("About Us")}
              </a>
            </li>
            <li>
              <a href="#ContactSection" className="text-white hover:underline">
                {t("Contact Us")}
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact Info */}
        <address className="footer-contact not-italic">
          <h2 className="mb-4 md:mb-10 font-bold">{t("Contact")}</h2>
          <p>Tel: 07******10</p>
          <p>
            Email:{" "}
            <a
              href="mailto:team.JEAN'S@gmail.com"
              className="text-white hover:underline"
              title="Email JEAN'S Team"
            >
              hitlapidis2@gmail.com
            </a>
          </p>
        </address>
      </section>

      <section className="bg-primary text-center py-4 md:py-8">
        <p>&copy; 2025 Jean, {t("all rights reserved")}</p>
      </section>
    </footer>
  );
};

export default Footer;
