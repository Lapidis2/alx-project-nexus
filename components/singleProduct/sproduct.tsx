'use client';
import React, { useEffect, useState } from 'react';
import heart from '@/public/assets/images/heart 1.svg';
import heartAct from '@/public/assets/images/red.svg';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import LoadingFrame from '@/constants/LoadingFrame';

interface Product {
  productId: string;
  name: string;
  price: number;
  discount?: number;
  image: string | string[];
  description?: string;
  quantity: number;
  Vendor?: { storeName: string };
}

interface SproductProps {
  productId: string;
}

const Sproduct: React.FC<SproductProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
        const images = typeof data.image === 'string' ? JSON.parse(data.image) : data.image;
        setSelectedImage(images?.[0] || '');
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addQuantity = () => setQuantity(prev => prev + 1);
  const subtractQuantity = () => setQuantity(prev => Math.max(1, prev));
  const addSize = () => setSize(prev => prev + 1);
  const subtractSize = () => setSize(prev => Math.max(1, prev));

  const toggleWishlist = () => {
    setIsWishlist(prev => !prev);
    toast.success(`Product ${!isWishlist ? 'added to' : 'removed from'} wishlist`);
  };

  if (isLoading || !product) return <LoadingFrame />;

  const images = typeof product.image === 'string' ? JSON.parse(product.image) : product.image;

  return (
    <section className="flex flex-col md:flex-row gap-6 p-5">
      {/* Product Images */}
      <div className="flex flex-col w-full md:w-2/3 gap-4">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <div className="flex gap-2">
          {images?.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className={`h-16 w-16 object-cover rounded cursor-pointer border ${
                selectedImage === img ? 'border-orange-500' : 'border-gray-200'
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col w-full md:w-1/3 gap-4">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.Vendor?.storeName}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
            {product.discount
              ? ((product.price - (product.price * product.discount) / 100) * quantity).toFixed(2)
              : (product.price * quantity).toFixed(2)} FRW
          </span>
          {product.discount && (
            <span className="text-sm line-through text-gray-400">
              {(product.price * quantity).toFixed(2)} FRW
            </span>
          )}
        </div>

        <div>
          <h3 className="text-orange-500 font-semibold">Description</h3>
          <p>
            {showFullDescription
              ? product.description
              : `${product.description?.slice(0, 100)}...`}
            {product.description && product.description.length > 100 && (
              <button
                className="text-orange-500 ml-2"
                onClick={() => setShowFullDescription(prev => !prev)}
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </button>
            )}
          </p>
        </div>

        {/* Quantity & Size */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 border rounded p-2">
            <button onClick={subtractQuantity}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button onClick={addQuantity}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="flex items-center gap-2 border rounded p-2">
            <button onClick={subtractSize}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{size}</span>
            <button onClick={addSize}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleWishlist}
            className="bg-gray-100 p-2 rounded"
          >
            <img src={isWishlist ? heartAct : heart} alt="wishlist" className="h-6 w-6" />
          </button>
          <button className="bg-orange-500 p-3 text-white rounded w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sproduct;
