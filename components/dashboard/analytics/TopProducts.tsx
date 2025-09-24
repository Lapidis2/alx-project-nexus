import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

interface TopProductType {
  productId: string;
  name: string;
  totalRevenue: number;
}

const TopProduct: React.FC = () => {
  const [topProducts, setTopProducts] = useState<TopProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch("/api/top-products"); // replace with your API route
        if (!res.ok) throw new Error("Failed to fetch top products");
        const data: TopProductType[] = await res.json();
        setTopProducts(data);
      } catch (err:unknown) {
		if (err instanceof Error) {
			setError(err.message);
		  } else {
			setError("An unexpected error occurred");
		  }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Circles visible height={80} width={80} color="#C9974C" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[90%]">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalRevenueSum = topProducts.reduce((acc, product) => acc + product.totalRevenue, 0);
  const progressColors = ["#FCB859", "#61A3BA", "#28AEF3", "#F2C8ED"];

  return (
    <section className="flex flex-col border-2 w-full rounded-md">
      <h2 className="text-black font-semibold text-lg text-center my-4">Top Products</h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-gray-700 bg-gray-100">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Popularity</th>
              <th className="px-6 py-3">Sales</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={product.productId} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">{"0" + (index + 1)}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4 w-[50%]">
                  <div className="w-full h-2 bg-gray-200 rounded-md relative">
                    <div
                      className="h-full rounded-md"
                      style={{
                        width: `${(product.totalRevenue * 100) / totalRevenueSum}%`,
                        backgroundColor: progressColors[index % progressColors.length],
                      }}
                    />
                  </div>
                </td>
                <td
                  className="px-6 py-2 flex justify-center items-center rounded-md border-2"
                  style={{
                    borderColor: progressColors[index % progressColors.length],
                    color: progressColors[index % progressColors.length],
                    opacity: 0.8,
                  }}
                >
                  ${product.totalRevenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopProduct;
