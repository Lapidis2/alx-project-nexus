import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const bestDealsData: Product[] = [
  {
    id: "1",
    name: "Samsung TV",
    description: "Discover the latest Samsung TV deals at unbeatable prices.",
    price: "678,453",
    image: "/assets/images/Products/tv.png", 
  },
  {
    id: "2",
    name: "Sony Headphones",
    description: "Experience immersive sound with the latest Sony headphones.",
    price: "123,000",
    image: "/assets/images/Products/headphone.png",
  },
];

const BestDeals: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentProduct = bestDealsData[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bestDealsData.length);
      setLoading(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-primary text-white p-8 sm:p-16 md:pl-24 flex flex-col md:flex-row items-center gap-10 font-outfit min-h-screen">
      
      {/* Text Content */}
      <article className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
        <header>
          <h2 className="text-2xl sm:text-xl md:text-3xl font-bold mb-4 md:mb-8">
            {currentProduct.name} Deals
          </h2>
        </header>
        <p className="text-base sm:text-sm md:text-xl mb-4 md:mb-6">
          {currentProduct.description}
        </p>
        <p className="text-base sm:text-sm md:text-xl font-semibold mb-4 md:mb-6">
          From{" "}
          <span className="bg-sky-400 text-black p-1 px-3 text-xs sm:text-sm rounded-xl">
            {currentProduct.price} Rwf
          </span>
        </p>
        <button className="bg-secondary px-4 py-2 sm:px-6 sm:py-2 rounded-lg text-base sm:text-sm md:text-lg hover:bg-secondary/80 transition">
          Shop Now
        </button>
      </article>

      {/* Image Content */}
      <figure className="md:w-1/2 relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
        {loading && <Skeleton height="100%" width="100%" className="rounded-lg" />}
        <Image
          src={currentProduct.image}
          alt={currentProduct.name}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoadingComplete={() => setLoading(false)}
          priority
        />
      </figure>
    </section>
  );
};

export default BestDeals;
