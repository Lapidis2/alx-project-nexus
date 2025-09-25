"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NewProductModal from "@/components/modal/CreateModal";
import UpdateProductModal from "@/components/modal/EditModal";
import { product, ProductFormData } from "@/interfaces/product";

const SellerProductsPage = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"new" | "edit">("new");
  const [selectedProduct, setSelectedProduct] = useState<product | null>(null);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/seller", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: product[] = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = (newProduct: ProductFormData) => {
    setProducts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...newProduct,
        images: newProduct.images || [],
      },
    ]);
  };

  const handleUpdate = (updatedProduct: product) => {
    // Ensure all required fields exist
    const safeProduct: product = {
      id: updatedProduct.id,
      name: updatedProduct.name || "",
      price: updatedProduct.price || 0,
      category: updatedProduct.category || "",
      description: updatedProduct.description || "",
      quantity: updatedProduct.quantity || 0,
      expiration: updatedProduct.expiration || "",
      images: updatedProduct.images || [],
    };

    setProducts((prev) =>
      prev.map((p) => (p.id === safeProduct.id ? safeProduct : p))
    );
  };

  const handleOpenNew = () => {
    setModalMode("new");
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleOpenEdit = (product: product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Products</h1>
        <button
          onClick={handleOpenNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="border rounded-lg shadow-sm overflow-hidden"
            >
              {/* Gallery grid */}
              <div className="grid grid-cols-2 gap-1 h-48">
                {product.images && product.images.length > 0 ? (
                  product.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="relative w-full h-24">
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 16vw"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-primary font-bold mt-2 mb-4">
                  ${product.price}
                </p>
                <div className="flex justify-between text-sm">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Shared modals */}
      {showModal && modalMode === "new" && (
        <NewProductModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}

      {showModal && modalMode === "edit" && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default SellerProductsPage;
