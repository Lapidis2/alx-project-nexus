"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/homePage/Header";
import Footer from "@/components/homePage/Footer";
import Search from "@/components/productsPage/SearchProduct";
import ProductCard from "@/components/productsPage/ProductCard";
import Pagination from "@/components/productsPage/Pagination";
import LoadingFrame from "@/constants/LoadingFrame";
import { useTranslation } from "react-i18next";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductsPage = () => {
  const { t } = useTranslation();


  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

 
  useEffect(() => {
	const fetchProducts = async () => {
	  try {
		setIsLoading(true);
		const res = await fetch("/api/products");
		const data = await res.json();
  
		
		const mappedData = data.map((p: any) => ({
		  id: p.id,
		  name: p.name,
		  price: p.price,
		  image: p.image || "/placeholder.jpg",
		  category: p.category || "Uncategorized",
		}));
  
		setProducts(mappedData);
	  } catch (error) {
		console.error("Failed to fetch products:", error);
	  } finally {
		setIsLoading(false);
	  }
	};
  
	fetchProducts();
  }, []);
  


  const filteredProducts = products.filter((product) => {
    const matchCategory = activeCategory ? product.category === activeCategory : true;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const categories = [
    { id: "001", label: t("Electronics"), value: "Electronics" },
    { id: "002", label: t("Food"), value: "Food" },
    { id: "003", label: t("Fruits"), value: "Fruits" },
    { id: "004", label: t("Mechanism"), value: "Mechanism" },
    { id: "005", label: t("Sport Kit"), value: "Sport Kit" },
    { id: "006", label: t("Clothing"), value: "Clothing" },
    { id: "007", label: t("Books"), value: "Books" },
    { id: "008", label: t("Furniture"), value: "Furniture" },
    { id: "009", label: t("Toys"), value: "Toys" },
    { id: "010", label: t("Stationery"), value: "Stationery" },
    { id: "011", label: t("Cars"), value: "Cars" },
    { id: "012", label: t("Shoes"), value: "Shoes" },
  ];

  return (
    <>
      <Header />

      <main className="mt-40 flex flex-col gap-8 px-6 md:px-10 mb-20">
      
        <header className="flex flex-col-reverse gap-4 justify-between items-center md:flex-row">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-row gap-3 items-center font-outfit text-sm md:text-base">
              <li>
                <button
                  type="button"
                  className="text-gray-400 hover:text-primary cursor-pointer"
                  onClick={() => setActiveCategory(null)}
                >
                  {t("Products")}
                </button>
              </li>
              <li aria-hidden="true" className="text-black font-bold">
                /
              </li>
              <li aria-current="page" className="text-gray-700 font-bold">
                {activeCategory || t("All Products")}
              </li>
            </ol>
          </nav>
          <Search onSearchChange={setSearchTerm} />
        </header>

        <section className="flex flex-col gap-6 md:flex-row">
        
          <aside className="w-full md:w-1/4" aria-label="Product Categories">
            <h2 className="text-lg font-bold mb-2">{t("Categories")}</h2>
            <ul className="flex gap-4 flex-row overflow-auto md:flex-col custom-scrollbar">
              {categories.map((item) => {
                const isActive = activeCategory === item.value;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`text-sm md:text-lg font-outfit ${
                        isActive ? "text-secondary font-semibold" : "text-black hover:text-primary"
                      }`}
                      onClick={() => setActiveCategory(item.value)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

        
          <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 w-full ">
            {isLoading ? (
              Array.from({ length: productsPerPage }).map((_, index) => (
                <LoadingFrame key={index} />
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full flex justify-center items-center">
                <h2 className="text-lg md:text-xl lg:text-2xl font-poppins text-secondary">
                  {t("No Products Available")}
                </h2>
              </div>
            ) : (
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </section>
        </section>

      
        <nav aria-label="Product Pagination" className="mt-6">
          <Pagination
            totalProducts={filteredProducts.length}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </nav>
      </main>

      <Footer />
    </>
  );
};

export default ProductsPage;
