"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/homePage/Header";
import Footer from "@/components/homePage/Footer";
import Sproduct from "@/components/singleProduct/sproduct";
// import Reviews from "@/components/singleProduct/reviews";
// import SimilarProduct from "@/components/singleProduct/SimilarProduct";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  quantity: number;
  category: string;
  discount?: number;
  Vendor: { storeName: string };
}

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
 
  const productId = Array.isArray(id) ? id[0] : id as string | undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();

        if (data.images && typeof data.images === "string") {
          data.images = JSON.parse(data.images);
        }

        setProduct(data);
      } catch {
        
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return <p className="text-center mt-32 text-lg">Loading product...</p>;

  if (!product)
    return <p className="text-center mt-32 text-lg">Product not found</p>;

  return (
    <div>
      <Header />
      <main className="flex flex-col justify-center pt-24">
        <Sproduct product={product} />

        {/* <Reviews productId={productId!} />

        {product && product.category && product.id ? (
          <SimilarProduct productId={product.id} />
        ) : (
          <p>Loading similar products...</p>
        )} */}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
