"use client";

import { useEffect, useState } from "react";
import ProductModal from "@/components/modal/ProductModal"
import { AdminProductDetails } from "@/interfaces/product";
import { toast } from "react-toastify";
const AdminProductsPage = () => {
  const [products, setProducts] = useState<AdminProductDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"new" | "edit">("new");
  const [selectedProduct, setSelectedProduct] = useState<AdminProductDetails | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (_id: string) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${_id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== _id));
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleOpenNew = () => {
    setModalMode("new");
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleOpenEdit = (product: AdminProductDetails) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleSave = (product: AdminProductDetails) => {
	if (modalMode === "edit") {
	  setProducts((prev) =>
		prev.map((p) => (p.id === product.id ? product : p))
	  );
	  fetch(`/api/products/${product.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(product),
	  });
	} else {
	  const newProduct = { ...product, id: crypto.randomUUID() };
	  setProducts((prev) => [...prev, newProduct]);
  
	  fetch(`/api/products`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newProduct),
	  });
	}
  };
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button
          onClick={handleOpenNew}
          className="text-blue-500 underline"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{product.name}</p>
                <p>${product.price}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleOpenEdit(product)}
                  className="text-green-600 underline"
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(product.id!)}
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
          product={modalMode === "edit" ? selectedProduct! : undefined}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;
