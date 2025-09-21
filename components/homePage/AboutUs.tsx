import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const about = "/assets/images/products/about.png";
const AboutJEAN: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about-JEAN"
      className="py-16 px-6 sm:px-12 md:px-24 bg-white font-outfit text-lg md:text-xl"
    >
      <header className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {t("ABOUT")} <span className="text-secondary">JEAN</span>
        </h2>
      </header>

      <article className="flex flex-col md:flex-row gap-8 md:gap-20">
      
        <figure className="flex-none w-full md:w-1/3 mb-8">
          <Image
            src={about}
            alt={t("About JEAN")}
            width={600}
            height={400}
            className="w-full h-60 sm:h-80 md:h-full rounded-lg object-cover"
         
          />
        </figure>

        <div className="flex-1">
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            {t(
              "JEAN Essentials is a team of developers who are passionate about creating online shopping experiences. Our goal is to make shopping easy and enjoyable for everyone."
            )}
          </p>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl mt-4">
            {t(
              "We focus on designing websites that are easy to use and look great. Whether you're buying clothes, electronics, or anything else, we want you to have a smooth and pleasant experience. Sellers can also create accounts on our platform to sell their products to a wide audience."
            )}
          </p>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl mt-4">
            {t(
              "We're here to help buyers and sellers connect in a friendly and trustworthy environment. Join us and explore a world of seamless online shopping!"
            )}
          </p>
        </div>
      </article>
    </section>
  );
};

export default AboutJEAN;
