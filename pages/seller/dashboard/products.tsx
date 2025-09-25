"use client";

import { useEffect, useState } from "react";
import NewProductModal from "@/components/modal/CreateModal"
import UpdateProductModal from "@/components/modal/EditModal"

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  quantity?: number;
  category?: string;
  expiration?: string;
  images: string[];
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"new" | "edit">("new");
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);

  useEffect(() => {
	const fetchProducts = async () => {
	  setLoading(true);
	  try {
		const res = await fetch("/api/seller");
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

  const handleDelete = async (id: string) => {
	const confirmed = confirm("Are you sure you want to delete this product?");
	if (!confirmed) return;

	try {
	  const res = await fetch(`/api/seller/${id}`, { method: "DELETE" });
	  if (res.ok) {
		setProducts((prev) => prev.filter((p) => p.id !== id));
	  } else {
		alert("Failed to delete product.");
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

  const handleOpenEdit = (product: AdminProduct) => {
	setModalMode("edit");
	setSelectedProduct(product);
	setShowModal(true);
  };

  const handleUpdate = (updatedProduct: AdminProduct) => {
	setProducts((prev) =>
	  prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
	);
  };
  const handleAdd = (newProduct: Omit<AdminProduct, "id">) => {
	const productWithId: AdminProduct = {
	  id: crypto.randomUUID(),
	  ...newProduct,
	};
	setProducts((prev) => [...prev, productWithId]);
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
				  onClick={() => handleDelete(product.id)}
				>
				  Delete
				</button>
			  </div>
			</li>
		  ))}
		</ul>
	  )}

	  {/* Conditionally Render Modal */}
	  {showModal && modalMode === "new" && (
		<NewProductModal
		  onClose={() => setShowModal(false)}
		  onAdd={handleAdd}
		/>
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

export default AdminProductsPage;
