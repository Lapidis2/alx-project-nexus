import React, { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";

interface SellerData {
  sellerId: string;
  userId: string;
  storeName: string;
  address: { city: string };
  TIN: string;
}

interface RequestsTableProps {
  sellers: SellerData[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ sellers: initialSellers }) => {
  const [sellers, setSellers] = useState<SellerData[]>(initialSellers);
  const [selectedSeller, setSelectedSeller] = useState<SellerData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");


  const sellersPerPage = 15;

  useEffect(() => setSellers(initialSellers), [initialSellers]);

  const filteredSellers = sellers.filter((s) =>
    s.storeName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller);
  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage);

  const handlePageChange = (p: number) => setCurrentPage(p);

  const handleApprove = async () => {
    if (!selectedSeller) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSellers((prev) => prev.filter((s) => s.userId !== selectedSeller.userId));
  
    setIsLoading(false);
    setSelectedSeller(null);
  };

  const handleDeny = async () => {
    if (!selectedSeller) return;
    
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSellers((prev) => prev.filter((s) => s.userId !== selectedSeller.userId));
 
    setIsLoading(false);
    setSelectedSeller(null);
 
  };

  return (
    <section className="w-full bg-white rounded-lg shadow-md overflow-hidden mt-20">
      {sellers.length === 0 ? (
        <p className="p-4 text-center text-secondary font-semibold">
          No requests present
        </p>
      ) : (
        <>
      
          <header className="flex flex-col sm:flex-row justify-between items-center p-4 gap-2">
            <h2 className="text-xl font-semibold text-gray-600">
              Vendor Applications
            </h2>
            <input
              type="search"
              aria-label="Search store name"
              className="border rounded-lg p-2 w-full sm:w-auto"
              placeholder="Search store name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </header>

       
          <main className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th scope="col" className="px-4 py-2 text-left">No</th>
                  <th scope="col" className="px-4 py-2 text-left">Store Name</th>
                  <th scope="col" className="px-4 py-2 text-left hidden md:table-cell">
                    City
                  </th>
                  <th scope="col" className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSellers.map((seller, idx) => (
                  <tr key={seller.sellerId} className="hover:bg-gray-50">
                    <th scope="row" className="px-4 py-2">
                      {String(indexOfFirstSeller + idx + 1).padStart(2, "0")}
                    </th>
                    <td className="px-4 py-2">{seller.storeName}</td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {seller.address.city}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        title={`View details of ${seller.storeName}`}
                        className="text-orange-500 hover:text-orange-700"
                        onClick={() => setSelectedSeller(seller)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
			
          </main>


        
          {selectedSeller && (
            <section
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 p-2"
            >
              <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Seller Details</h3>
                <p><strong>Store Name:</strong> {selectedSeller.storeName}</p>
                <p><strong>City:</strong> {selectedSeller.address.city}</p>
                <p><strong>TIN:</strong> {selectedSeller.TIN}</p>
                <div className="mt-4 flex justify-center items-center gap-2 sm:flex-row">
                  {isLoading ? (
                    <Circles visible={true} height="60" width="60" color="#C9974C" />
                  ) : (
                    <>
                      <button
                        title="Approve seller"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={handleApprove}
                      >
                        Approve
                      </button>
                      <button
                        title="Reject seller"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={handleDeny}
                      >
                        Deny
                      </button>
                      <button
                        title="Close modal"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        onClick={() => setSelectedSeller(null)}
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>
          )}

          <nav
            aria-label="Pagination"
            className="flex justify-center py-4 mb-5 overflow-x-auto"
          >
            <ul className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button
                    className={`px-3 py-2 rounded-md ${
                      page === currentPage
                        ? "bg-gray-400 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </section>
  );
};

export default RequestsTable;
