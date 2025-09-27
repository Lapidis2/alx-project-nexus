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
  
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<AdminProduct>({
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    category: "",
    expiration: "",
    images: [],
    ...product,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((f) => URL.createObjectURL(f));
    setFormData((prev) => ({ ...prev, images: [...(prev.images || []), ...newImages] }));
  };

  const handleRemoveImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full border rounded px-3 py-2" />
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="w-full border rounded px-3 py-2" />
          <input type="number" name="quantity" value={formData.quantity ?? ""} onChange={handleChange} placeholder="Quantity" className="w-full border rounded px-3 py-2" />
          <textarea name="description" value={formData.description || ""} onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2" />
          <input type="text" name="category" value={formData.category || ""} onChange={handleChange} placeholder="Category" className="w-full border rounded px-3 py-2" />
          <input type="date" name="expiration" value={formData.expiration || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />

          {/* Images */}
          <div className="grid grid-cols-3 gap-2">
            {(formData.images || []).map((img, idx) => (
              <div key={idx} className="relative w-full h-24 border rounded overflow-hidden">
                <Image src={img} alt={`img-${idx}`} fill style={{ objectFit: "cover" }} />
                <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">×</button>
              </div>
            ))}
            <label className="w-full h-24 flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
              <span className="text-xs text-gray-600">Upload</span>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{product ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
