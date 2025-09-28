// components/modal/ProductModal.tsx

import React, { useState, useEffect } from "react";

// AdminProduct Type Interface
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

interface ProductModalProps {
  product?: AdminProduct;
  onClose: () => void;
  onSave: (product: AdminProduct) => void | Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<AdminProduct>({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
    expiration: "",
    images: [],
    ...product, // Pre-fill form with the existing product data
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: typeof product.price === "string" ? product.price : product.price.toString(),
        quantity: typeof product.quantity === "string" ? product.quantity : product.quantity.toString(),
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === "" || isNaN(Number(value))
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData: AdminProduct = {
      ...formData,
      price: typeof formData.price === "string" ? parseFloat(formData.price as string) : formData.price,
      quantity: typeof formData.quantity === "string" ? parseInt(formData.quantity as string) : formData.quantity,
    };
    onSave(formattedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
