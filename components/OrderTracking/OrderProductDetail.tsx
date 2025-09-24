
import React from "react";


export interface Product {
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface OrderProductDetailsProps {
  products?: Product[];
  orderId:string;
}

const OrderProductDetails: React.FC<OrderProductDetailsProps> = ({ products }) => {
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
    <div className="container font-outfit">
      <h3 className="font-bold mb-4 text-lg font-poppins">Order Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2 text-primary">Product</th>
              <th className="px-4 py-2 text-primary">Quantity</th>
              <th className="px-4 py-2 text-primary">Price</th>
              <th className="px-4 py-2 text-primary">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product, index: number) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{product.productName}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">{product.price} $</td>
                <td className="px-4 py-2">{product.total} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderProductDetails;
