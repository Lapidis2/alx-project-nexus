"use client";
import React, { useState } from "react";
import Image from "next/image";

interface AdminProduct {
  _id?: string;
  name: string;
  price: number | string; // allow string temporarily for input
  description?: string;
  quantity?: number | string;
  category?: string;
  expiration?: string;
  images: string[];
}

interface ProductModalProps {
  product?: AdminProduct;
  onClose: () => void;
  onSave: (product: AdminProduct) => void | Promise<void>;
}

const categories = [
  "Electronics",
  "Food",
  "Fruits",
  "Mechanism",
  "Sport Kit",
  "Clothing",
  "Books",
  "Furniture",
  "Toys",
  "Stationary",
  "Cars",
  "Shoes",
];

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  // Initialize formData with either the passed product or default values
  const [formData, setFormData] = useState<AdminProduct>({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
    expiration: "",
    images: [],
    ...product,
  });

  const [uploading, setUploading] = useState(false);

  // Handle changes to input fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === "" || isNaN(Number(value)) // Prevent invalid number
            ? ""
            : Number(value)
          : value,
    }));
  };

  // Handle image upload
  const uploadToLocal = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await res.json();
    return data.url;
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setUploading(true);

    try {
      const files = Array.from(e.target.files);
      const uploadPromises = files.map((file) => uploadToLocal(file));
      const urls = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...urls],
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

 
  const handleRemoveImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== idx),
    }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData: AdminProduct = {
      ...formData,
      price: typeof formData.price === "string" ? Number(formData.price) : formData.price,
      quantity: typeof formData.quantity === "string" ? Number(formData.quantity) : formData.quantity,
    };

    onSave(formattedData); // Pass formatted data to onSave
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="price"
            value={formData.price !== undefined && formData.price !== null ? formData.price.toString() : ""}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity !== undefined && formData.quantity !== null ? formData.quantity.toString() : ""}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
          />
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="expiration"
            value={formData.expiration || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <div className="grid grid-cols-3 gap-2">
            {(formData.images || []).map((img, idx) => (
              <div
                key={idx}
                className="relative w-full h-24 border rounded overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`img-${idx}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
            <label className="w-full h-24 flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
              <span className="text-xs text-gray-600">
                {uploading ? "Uploading..." : "Upload"}
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {product ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
