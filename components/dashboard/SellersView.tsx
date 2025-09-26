import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

interface SellerData {
  sellerId: string;
  userId: string;
  storeName: string;
  address: {
    city: string;
  };
  TIN: string;
  status: string;
}

interface UserData {
  userId: string;
  name: string;
  email: string;
}

const mockSellers: SellerData[] = [
  {
    sellerId: "1",
    userId: "u1",
    storeName: "Tech World",
    address: { city: "Kigali" },
    TIN: "123456789",
    status: "approved",
  },
  {
    sellerId: "2",
    userId: "u2",
    storeName: "Agro Mart",
    address: { city: "Musanze" },
    TIN: "987654321",
    status: "approved",
  },
];

const mockUsers: UserData[] = [
  { userId: "u1", name: "Jean Pierre", email: "jean@example.com" },
  { userId: "u2", name: "Aime Uwase", email: "aime@example.com" },
];

const SellersView: React.FC = () => {
  const [selectedSeller, setSelectedSeller] = useState<SellerData | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const sellersPerPage = 15;

  useEffect(() => {
    // simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const approvedSellers = mockSellers.filter(
    (seller) => seller.status === "approved"
  );

  const filteredSellers = approvedSellers.filter((seller) =>
    seller.storeName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredSellers.slice(
    indexOfFirstSeller,
    indexOfLastSeller
  );

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onViewDetails = (seller: SellerData) => {
    setSelectedSeller(seller);
    const user = mockUsers.find((user) => user.userId === seller.userId);
    setSelectedUser(user || null);
  };

  const closeModal = () => {
    setSelectedSeller(null);
    setSelectedUser(null);
  };

  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-[90%]">
        <Circles visible height="80" width="80" color="#C9974C" />
      </main>
    );
  }

  return (
    <section
      aria-labelledby="sellers-heading"
      className="w-full bg-white rounded-lg shadow-md overflow-hidden mt-20"
    >
      <header className="flex justify-between items-center p-4">
        <h1
          id="sellers-heading"
          className="text-xl md:text-lg font-semibold text-gray-600"
        >
          Approved Sellers
        </h1>
        <input
          type="search"
          aria-label="Search store name"
          className="border rounded-lg p-2"
          placeholder="Search storename"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {filteredSellers.length === 0 ? (
        <p className="items-center p-4 text-center text-secondary font-semibold">
          No Approved Sellers
        </p>
      ) : (
        <>
          <table className="min-w-full" aria-describedby="sellers-heading">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th scope="col" className="px-4 py-2 text-left">
                  No
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Store Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left hidden md:table-cell lg:table-cell"
                >
                  City
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSellers.map((seller, index) => (
                <tr key={seller.sellerId}>
                  <td className="px-4 py-2 text-left">
                    {String(indexOfFirstSeller + index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2">{seller.storeName}</td>
                  <td className="px-4 py-2 hidden md:table-cell lg:table-cell">
                    {seller.address.city}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-orange-500 hover:text-orange-700"
                      onClick={() => onViewDetails(seller)}
                      aria-label={`View details of ${seller.storeName}`}
                    >
                      👁 View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedSeller && selectedUser && (
            <aside
              role="dialog"
              aria-modal="true"
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
            >
              <article className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Seller Details</h2>
                <p>
                  <strong>Seller Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Seller Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Store Name:</strong> {selectedSeller.storeName}
                </p>
                <p>
                  <strong>City:</strong> {selectedSeller.address.city}
                </p>
                <p>
                  <strong>TIN:</strong> {selectedSeller.TIN}
                </p>
                <div className="mt-4 text-right">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </article>
            </aside>
          )}

          <footer className="flex justify-center py-4 mb-5">
            <nav aria-label="Pagination">
              <ul className="flex pl-0 list-none rounded space-x-2">
                {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                  <li key={pageNumber} className="block">
                    <button
                      className={`${
                        currentPage === pageNumber + 1
                          ? "bg-gray-400 text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      } px-3 py-2 rounded-md`}
                      onClick={() => onPageChange(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </footer>
        </>
      )}
    </section>
  );
};

export default SellersView;
