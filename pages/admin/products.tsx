"use client";
import React, { useState, useEffect } from "react";
import ProductModal from "@/components/modal/ProductModal";

interface AdminProduct {
  _id?: string;
  name: string;
  price: number;
  description?: string;
  quantity?: number;
  category?: string;
  expiration?: string;
  images: string[];
}

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);

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
    if (product._id) {
      // Update
      await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      setProducts((prev) => prev.map((p) => (p._id === product._id ? product : p)));
    } else {
      // Add
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const saved = await res.json();
      setProducts((prev) => [...prev, saved]);
    }
  };

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
        <button onClick={() => { setSelectedProduct(null); setShowModal(true); }} className="text-blue-500 underline">+ Add Product</button>
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
                <button onClick={() => { setSelectedProduct(p); setShowModal(true); }} className="text-green-600 underline">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <ProductModal
          product={selectedProduct || undefined}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;
