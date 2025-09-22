import React, { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

// mock users for now (replace with API later)
const mockUsers: UserData[] = [
  { id: 1, name: "Jean Pierre", email: "jean@example.com", role: "seller" },
  { id: 2, name: "Aime Uwase", email: "aime@example.com", role: "buyer" },
  { id: 3, name: "Eric Mugisha", email: "eric@example.com", role: "admin" },
];

const SellerTable: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const usersPerPage = 15;

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const onViewDetails = (user: UserData) => setSelectedUser(user);

  const closeModal = () => setSelectedUser(null);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-[90%]">
        <Circles visible height="80" width="80" color="#C9974C" />
      </main>
    );
  }

  return (
    <section
      aria-labelledby="users-heading"
      className="w-full bg-white rounded-lg shadow-md overflow-hidden lg:mb-12 xl:ml-[5%] mt-3"
    >
      <header className="flex justify-between items-center p-4">
        <h1 id="users-heading" className="text-xl font-semibold text-gray-600">
          All Users
        </h1>
        <input
          type="search"
          aria-label="Search username"
          className="border rounded-lg p-2"
          placeholder="Search username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {filteredUsers.length === 0 ? (
        <p className="items-center p-4 text-center text-secondary font-semibold">
          No users found
        </p>
      ) : (
        <>
          <table className="min-w-full" aria-describedby="users-heading">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th scope="col" className="px-4 py-2 text-left">
                  No
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  User Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left hidden md:table-cell lg:table-cell"
                >
                  Email
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-left">
                    {String(indexOfFirstUser + index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2 hidden md:table-cell lg:table-cell">
                    {user.email}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-orange-500 hover:text-orange-700"
                      onClick={() => onViewDetails(user)}
                      aria-label={`View details of ${user.name}`}
                    >
                      👁 View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedUser && (
            <aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="user-details-heading"
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
            >
              <article className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                <h2
                  id="user-details-heading"
                  className="text-lg font-semibold mb-4"
                >
                  User Details
                </h2>
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
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

export default SellerTable;
