import React, { useState, useEffect } from "react";
import { AdminProduct } from "@/interfaces/product"; // Import AdminProduct from the centralized file

interface ProductModalProps {
  product?: AdminProduct;
  onClose: () => void;
  onSave: (product: AdminProduct) => void | Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<AdminProduct>({
    id: "",
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    category: "",
    expiration: "",
    images: [],
    ...product,  // Pre-fill form with the existing product data if available
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: typeof product.price === "number" ? product.price : 0,
        quantity: typeof product.quantity === "number" ? product.quantity : 0,
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
            ? 0
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
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              className="w-full py-2 bg-gray-300 rounded text-black"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 rounded text-white"
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
