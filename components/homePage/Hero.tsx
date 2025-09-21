import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const heroImages: string[] = [
  "/assets/images/products/watch1.jpg",
  "/assets/images/products/shoes.png",
  "/assets/images/products/watch4.png",
];

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = () => setIsLoading(false);

  return (
    <section className="sm:mt-4 md:mt-24 lg:mt-24 bg-primary text-white px-8 py-[15vh] h-[100vh] md:px-8 lg:px-16 flex flex-col lg:flex-row gap-8 lg:gap-64 font-outfit">
    
      <div className="w-full md:w-1/2 flex flex-col gap-4 lg:gap-8 z-10">
        <h1 className="text-3xl font-bold mb-4 lg:mb-8">
          <span className="text-secondary">JEAN</span> ONLINE SHOP
        </h1>
        <p className="text-xl mb-4">
          {t("Welcome to our online store! Whether you're a buyer looking for great")}{" "}
          {t("deals or a seller wanting to showcase your products, our platform")}{" "}
          {t("offers you the opportunity to connect and thrive. Explore our wide")}{" "}
          {t("range of products and create an account")}{" "}
          <Link href="/auth/register" className="text-secondary font-bold px-1">{t("here")}</Link>{" "}
          {t("to get started")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products" className="bg-secondary w-full py-4 rounded-lg text-center">{t("Shop Now")}</Link>
          <Link href="#ContactSection" className="bg-[#08447D] w-full py-4 rounded-lg text-center">{t("Contact Us")}</Link>
        </div>
      </div>
	  <div className="w-full md:w-1/2 lg:w-1/2 relative max-w-[500px] aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/9] mt-8 lg:mt-0 overflow-hidden rounded-lg mx-auto">

  {isLoading && (
    <div className="absolute inset-0">
      <Skeleton className="w-full h-full rounded-lg" />
    </div>
  )}

  <Image
    key={currentImageIndex}
    src={heroImages[currentImageIndex]}
    alt="Hero section image"
    fill
    className={`rounded-lg transition-opacity duration-1000 ${
      isLoading ? "opacity-0" : "opacity-100"
    } object-contain md:object-cover`}
    onLoadingComplete={handleImageLoad}
    priority
  />

  <div className="absolute inset-0 bg-primary/50 rounded-lg pointer-events-none"></div>
</div>






    </section>
  );
};

export default HeroSection;
