"use client";
import React, { useState, useEffect } from "react";
import ProductModal from "@/components/modal/ProductModal";


interface AdminProduct {
  _id?: string;
  name: string;
  price: number | string;  
  description?: string;
  quantity: number | string;  
  category?: string;
  expiration?: string;
  images: string[];
}

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | undefined>(undefined);
  const [modalMode, setModalMode] = useState<"edit" | "add">("add");

  // Fetch Products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (product: AdminProduct) => {
 
    product.price = typeof product.price === "string" ? parseFloat(product.price as string) : product.price;
    product.quantity = typeof product.quantity === "string" ? parseInt(product.quantity as string) : product.quantity;

    if (product._id) {
      
      await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      setProducts((prev) => prev.map((p) => (p._id === product._id ? product : p)));
    } else {
      // Add new product
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const saved = await res.json();
      setProducts((prev) => [...prev, saved]);
    }
  };

  // Delete Product
  const handleDelete = async (_id?: string) => {
    if (!_id) return;
    const confirmed = confirm("Delete product?");
    if (!confirmed) return;
    await fetch(`/api/products/${_id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p._id !== _id));
  };

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button
          onClick={() => { setSelectedProduct(undefined); setModalMode("add"); setShowModal(true); }}
          className="text-blue-500 underline"
        >
          + Add Product
        </button>
      </div>

      {loading ? <p>Loading...</p> : (
        <ul className="space-y-4">
          {products.map((p) => (
            <li key={p._id} className="border p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-bold">{p.name}</p>
                <p>${p.price}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => { setSelectedProduct(p); setModalMode("edit"); setShowModal(true); }}
                  className="text-green-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <ProductModal
          product={modalMode === "edit" ? selectedProduct : undefined}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;
