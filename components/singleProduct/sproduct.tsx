"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string[];
  description: string;
  quantity: number;
  discount?: number;
  Vendor: { storeName: string };
}

interface Props {
  product: Product;
  isLoading?: boolean;
}

const Sproduct: React.FC<Props> = ({ product, isLoading = false }) => {
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);


  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
  };

  const addQuantity = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  const subtractQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addSize = () => {
    setSize((size || 0) + 1);
  };

  const subtractSize = () => {
    if (size && size > 0) setSize(size - 1);
  };

  const toggleWishlist = () => {
    let updatedWishlist = [...wishlist];
    if (wishlist.includes(product.id)) {
      updatedWishlist = updatedWishlist.filter(id => id !== product.id);
    } else {
      updatedWishlist.push(product.id);
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as {
      productId: string;
      name: string;
      price: number;
      quantity: number;
      size: number | null;
    }[];

    const finalPrice = product.discount
      ? (product.price - product.price * (product.discount / 100)) * quantity
      : product.price * quantity;

    const existingIndex = cart.findIndex(
      item => item.productId === product.id && item.size === size
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: finalPrice,
        quantity,
        size,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${quantity} ${product.name} added to cart!`);
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
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex gap-2 mt-2">
          {product.image.map((img, idx) => (
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
          Store: <span className="font-semibold">{product.Vendor.storeName}</span>
        </p>

        <div className="flex items-center gap-4">
          <p className="text-xl font-bold text-blue-700">{finalPrice} RWF</p>
          {product.discount && <p className="line-through text-gray-400">{product.price * quantity} RWF</p>}
          {product.discount && (
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{product.discount}% OFF</span>
          )}
        </div>

        <p className="bg-gray-200 inline-block px-3 py-1 rounded-md font-semibold">{product.quantity} IN STOCK</p>

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
            <button onClick={subtractQuantity}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button onClick={addQuantity}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div className="flex items-center border rounded-md p-2 gap-2">
            <span>Size:</span>

	
            <button onClick={subtractSize}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{size || 0}</span>
            <button onClick={addSize}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

    
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`bg-orange-400 text-white p-3 rounded-md w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-500"
            }`}
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>

          <button
            onClick={toggleWishlist}
            disabled={isLoading}
            className="bg-white border p-3 rounded-md w-20 flex justify-center items-center"
          >
            {wishlist.includes(product.id) ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sproduct;
