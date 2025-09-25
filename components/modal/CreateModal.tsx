"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ProductFormData } from "@/interfaces/product";

interface CreateModalProps {
  onClose: () => void;
  onAdd: (newProduct: ProductFormData) => void;
}

const NewProductModal: React.FC<CreateModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    quantity: 0,
    expiration: "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
	<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
	  <div className="bg-white p-6 rounded-lg w-[600px] shadow-lg">
		<h2 className="text-xl font-bold mb-4">Add New Product</h2>
  
		<form onSubmit={handleSubmit} className="space-y-4">
		  {/* Name + Description */}
		  <div className="grid grid-cols-2 gap-4">
			<div>
			  <label className="block text-sm font-medium">Product Name</label>
			  <input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				className="w-full border rounded px-3 py-2 mt-1"
			  />
			</div>
			<div>
			  <label className="block text-sm font-medium">Description</label>
			  <input
				type="text"
				name="description"
				value={formData.description}
				onChange={handleChange}
				className="w-full border rounded px-3 py-2 mt-1"
			  />
			</div>
		  </div>
  
		  {/* Price + Category */}
		  <div className="grid grid-cols-2 gap-4">
			<div>
			  <label className="block text-sm font-medium">Price</label>
			  <input
				type="number"
				name="price"
				value={formData.price}
				onChange={handleChange}
				className="w-full border rounded px-3 py-2 mt-1"
			  />
			</div>
			<div>
			  <label className="block text-sm font-medium">Category</label>
			  <select
				name="category"
				value={formData.category}
				onChange={handleChange}
				className="w-full border rounded px-3 py-2 mt-1"
			  >
				<option value="">Select Category</option>
				<option value="Watches">Watches</option>
				<option value="Electronics">Electronics</option>
				<option value="Clothing">Clothing</option>
			  </select>
			</div>
		  </div>
  
		  {/* Quantity + Expiration Date */}
		  <div className="grid grid-cols-2 gap-4">
			<div>
			  <label className="block text-sm font-medium">Quantity</label>
			  <input
				type="number"
				name="quantity"
				value={formData.quantity}
				onChange={handleChange}
				className="w-full border rounded px-3 py-2 mt-1"
			  />
			</div>
			<div>
			  <label className="block text-sm font-medium">Expiration Date</label>
			  <input
				type="date"
				name="expiration"
				value={formData.expiration}
				onChange={handleChange}
				className="w-full border rounded px-3 py-2 mt-1"
			  />
			</div>
		  </div>
  
		  {/* Image Upload + Preview */}
		  <div>
			<label className="block text-sm font-medium mb-2">Images</label>
			<div className="grid grid-cols-4 gap-4">
			  {/* Uploaded images */}
			  {formData.images.map((img, index) => (
				<div key={index} className="relative w-full aspect-square rounded overflow-hidden border">
				  <Image
					src={img}
					alt={`preview-${index}`}
					fill
					className="object-cover"
				  />
				  <button
					type="button"
					onClick={() => handleImageRemove(index)}
					className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
				  >
					×
				  </button>
				</div>
			  ))}
  
			  {/* Upload Button */}
			  <label className="relative w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
				<span className="text-xs text-gray-600 text-center">Upload</span>
				<input
				  type="file"
				  accept="image/*"
				  multiple
				  onChange={handleImageUpload}
				  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				/>
			  </label>
			</div>
			<p className="text-xs text-gray-600 mt-1">PNG or JPG, unlimited uploads</p>
		  </div>
  
		  {/* Actions */}
		  <div className="flex justify-between gap-3 pt-4">
			<button
			  type="button"
			  onClick={onClose}
			  className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
			>
			  Back
			</button>
			<button
			  type="submit"
			  className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
			>
			  Confirm
			</button>
		  </div>
		</form>
	  </div>
	</div>
  );
  
};

export default NewProductModal;
