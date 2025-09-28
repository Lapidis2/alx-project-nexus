"use client";
import React, { useState } from "react";
import Image from "next/image";


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

  const [formData, setFormData] = useState<AdminProduct>({
    name: product?.name || "",
    price: product?.price || 0,  
    description: product?.description || "",
    quantity: product?.quantity ?? 0, 
    category: product?.category || "",
    expiration: product?.expiration || "",
    images: product?.images || [],
  });

  const [uploading, setUploading] = useState(false);

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
          ? value === "" || isNaN(Number(value))
            ? 0  
            : Number(value)
          : value,
    }));
  };

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

    onSave(formattedData);
    onClose();
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
            value={formData.price.toString()}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity?.toString() || "0"} 
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
          <div className="flex flex-wrap gap-2">
            {formData.images?.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20">
                <Image
                  src={img}
                  alt="Uploaded image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 text-white bg-black/50 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ))}
            <label
              htmlFor="image-upload"
              className="w-20 h-20 bg-gray-200 flex items-center justify-center text-center rounded-md cursor-pointer"
            >
              {uploading ? "Uploading..." : "Upload"}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              hidden
            />
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-gray-300 rounded text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
