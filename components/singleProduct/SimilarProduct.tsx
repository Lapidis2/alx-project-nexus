'use client';
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productsPage/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Product {
	id:string
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface SimilarProductProps {
  productId: string;
}

const SimilarProduct: React.FC<SimilarProductProps> = ({ productId }) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      setStatus("loading");
      try {
        const res = await fetch(`/api/products/similar/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch similar products");
        const data = await res.json();
        setSimilarProducts(data.products || []);
        setStatus("success");
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setStatus("failed");
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  return (
    <section className="similar-products-container flex flex-col items-center py-8">
      <h2 className="font-extrabold text-center text-2xl mb-6">Related Products</h2>

      {status === "loading" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-4/5">
          {Array(4).fill(0).map((_, index) => (
            <Skeleton key={index} height={250} width="100%" />
          ))}
        </div>
      ) : status === "failed" ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-4/5">
          {similarProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarProduct;
