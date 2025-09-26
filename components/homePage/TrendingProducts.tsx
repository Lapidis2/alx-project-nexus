"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const popularProducts: Product[] = [
  {
    id: 1,
    name: "Classic Watch",
    category: "Accessories",
    price: 25000,
    image: "/assets/images/products/watch1.jpg",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 45000,
    image: "/assets/images/products/shoes.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    category: "Electronics",
    price: 35000,
    image: "/assets/images/products/headphone.jpg",
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Footwear",
    price: 45000,
    image: "/assets/images/products/shoes.jpg",
  },
  {
    id: 5,
    name: "Headphones",
    category: "Electronics",
    price: 35000,
    image: "/assets/images/products/headphone.jpg",
  },
  {
    id: 6,
    name: "Headphones",
    category: "Electronics",
    price: 35000,
    image: "/assets/images/products/headphone.jpg",
  },
];

const PopularProducts: React.FC = () => {
  const [currentProducts] = useState<Product[]>(popularProducts);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  const toggleLike = (id: number) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 px-6 sm:px-12 md:px-24 font-outfit bg-white min-h-screen">
      <div className="mb-8 flex items-center">
        <div className="w-24 h-2 bg-secondary mr-4"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-black">
          TRENDING PRODUCTS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => {
          const isLiked = likedProducts.includes(product.id);
          return (
            <div
              key={`${product.id}-${product.name}`}
              onClick={() => handleCardClick(product.id)}
              className="cursor-pointer rounded-lg shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white relative"
            >
              {loading ? (
                <Skeleton className="w-full aspect-[4/3] mb-4 rounded-lg" />
              ) : (
                <div className="relative w-full aspect-[4/3] mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              <p className="md:text-lg sm:text-sm text-gray-500">
                {product.category}
              </p>
              <h3 className="md:text-xl sm:text-lg text-secondary">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="md:text-xl sm:text-lg font-semibold text-gray-900">
                  {product.price} Rwf
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // stop click from propagating to card
                    toggleLike(product.id);
                  }}
                  className={`text-2xl ${
                    isLiked ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {isLiked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularProducts;
