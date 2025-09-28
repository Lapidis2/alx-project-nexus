"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];  // fixed from image to images
  description: string;
  quantity: number;
  discount?: number;  // Make discount optional
  Vendor: { storeName: string };
}

interface Props {
  product: Product;
  isLoading?: boolean;
  onCartUpdate?: (count: number) => void;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

const Sproduct: React.FC<Props> = ({ product, isLoading = false, onCartUpdate }) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.images?.[0] || "/placeholder.jpg");
  const [quantity, setQuantity] = useState<number>(1);  // explicitly typed as number
  const [size, setSize] = useState<number | null>(null);  // explicitly typed as number | null
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);  // explicitly typed as boolean
  const [wishlist, setWishlist] = useState<string[]>([]);  // explicitly typed as string[]
  const [loading, setLoading] = useState<boolean>(false);  // explicitly typed as boolean

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    setSelectedImage(product.images?.[0] || "/placeholder.jpg");
  }, [product.images]);

  const handleImageClick = (img: string) => setSelectedImage(img);
  const addQuantity = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };
  const subtractQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const addSize = () => setSize((size || 0) + 1);
  const subtractSize = () => {
    if (size && size > 0) setSize(size - 1);
  };

  const toggleWishlist = () => {
    let updatedWishlist = [...wishlist];
    if (wishlist.includes(product.id)) {
      updatedWishlist = updatedWishlist.filter((id) => id !== product.id);
    } else {
      updatedWishlist.push(product.id);
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        setLoading(false);
        return;
      }

      const finalPrice = product.discount
        ? (product.price - product.price * (product.discount / 100)) * quantity
        : product.price * quantity;

      const item: CartItem = {
        productId: product.id,
        name: product.name,
        price: finalPrice,
        img: product.images?.[0] || "/placeholder.jpg",
        quantity,
      };

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      alert(`${quantity} ${product.name} added to cart!`);

      if (onCartUpdate) {
        const cartRes = await fetch("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cartData = await cartRes.json();
        const count =
          cartData.cart?.items?.reduce(
            (acc: number, item: CartItem) => acc + item.quantity,
            0
          ) || 0;
        onCartUpdate(count);
      }
    } catch (err: unknown) {
      console.error(err);
      alert("Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  const finalPrice = product.discount
    ? (product.price - product.price * (product.discount / 100)) * quantity
    : product.price * quantity;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <div className="relative w-full h-[300px] md:h-[400px] border rounded-md overflow-hidden">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex gap-2 mt-2">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleImageClick(img)}
              className={`w-20 h-20 relative cursor-pointer border rounded-md ${
                selectedImage === img ? "border-primary" : "border-gray-300"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" sizes="80px" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700">
          Store: <span className="font-semibold">{product.Vendor?.storeName || "Unknown Store"}</span>
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold text-blue-700">{finalPrice} RWF</p>
          {product.discount && (
            <p className="line-through text-gray-400">{product.price * quantity} RWF</p>
          )}
          {product.discount && (
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{product.discount}% OFF</span>
          )}
        </div>

        <p className="bg-gray-200 inline-block px-3 py-1 rounded-md font-semibold">
          {product.quantity} IN STOCK
        </p>

        <div>
          <h2 className="font-semibold text-lg mt-2">Description</h2>
          {showFullDescription ? (
            <p>{product.description}</p>
          ) : (
            <p>
              {product.description.slice(0, 100)}
              {product.description.length > 100 && (
                <button className="text-primary ml-2" onClick={() => setShowFullDescription(true)}>
                  Show more
                </button>
              )}
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex items-center border rounded-md p-2 gap-2">
            <span>Quantity:</span>
            <button onClick={subtractQuantity} aria-label="Decrease quantity">
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button onClick={addQuantity} aria-label="Increase quantity">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div className="flex items-center border rounded-md p-2 gap-2">
            <span>Size:</span>
            <button onClick={subtractSize} aria-label="Decrease size">
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{size || 0}</span>
            <button onClick={addSize} aria-label="Increase size">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            disabled={loading || isLoading}
            className={`bg-orange-400 text-white p-3 rounded-md w-full ${
              loading || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-500"
            }`}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          <button
            onClick={toggleWishlist}
            disabled={isLoading}
            className="bg-white border p-3 rounded-md w-20 flex justify-center items-center"
          >
            {wishlist.includes(product.id) ? "♥" : "❤️"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sproduct;
