"use client";

import React, { useState } from "react";
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
  isWishlist?: boolean;
  isLoading?: boolean;
  toggleWishlist?: () => void;
}

const Sproduct: React.FC<Props> = ({
  product,
  isWishlist = false,
  isLoading = false,
  toggleWishlist = () => {},
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const handleAddToCart = () => {
    console.log("Add to cart", { product, quantity, size });
  };

  const finalPrice = product.discount
    ? (product.price - product.price * (product.discount / 100)) * quantity
    : product.price * quantity;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
      {/* Images */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <div className="relative w-full h-[300px] md:h-[400px] border rounded-md overflow-hidden">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnail images */}
        <div className="flex gap-2 mt-2">
          {product.image.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleImageClick(img)}
              className={`w-20 h-20 relative cursor-pointer border rounded-md ${
                selectedImage === img ? "border-primary" : "border-gray-300"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700">
          Store: <span className="font-semibold">{product.Vendor.storeName}</span>
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

        {/* Stock */}
        <p className="bg-gray-200 inline-block px-3 py-1 rounded-md font-semibold">
          {product.quantity} IN STOCK
        </p>

        {/* Description */}
        <div>
          <h2 className="font-semibold text-lg mt-2">Description</h2>
          {showFullDescription ? (
            <p>{product.description}</p>
          ) : (
            <p>
              {product.description.slice(0, 100)}
              {product.description.length > 100 && (
                <button
                  className="text-primary ml-2"
                  onClick={() => setShowFullDescription(true)}
                >
                  Show more
                </button>
              )}
            </p>
          )}
        </div>

        {/* Quantity & Size */}
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

        {/* Actions */}
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
            {isWishlist ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sproduct;
