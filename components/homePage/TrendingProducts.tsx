"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

interface Product {
  id: string; 
  name: string;
  category: string;
  price: number;
  images: string[]; 
}

const PopularProducts: React.FC = () => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await fetch("/api/products/popular");
        const data = await res.json();
		console.log("message fetched data are",data)
        setCurrentProducts(data);
      } catch (error) {
        console.error("Failed to fetch popular products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  const toggleLike = (id: string) => {
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
              key={product.id}
              onClick={() => handleCardClick(product.id)}
              className="cursor-pointer rounded-lg shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white relative"
            >
              {loading ? (
                <Skeleton className="w-full aspect-[4/3] mb-4 rounded-lg" />
              ) : (
                <div className="relative w-full aspect-[4/3] mb-4">
                <Image
  src={product.images && product.images.length > 0 ? product.images[0] : "/assets/images/products/placeholder.jpg"}
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
                    e.stopPropagation();
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
