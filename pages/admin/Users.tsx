import React from "react";
import SellerTable,{User} from "@/components/dashboard/UserTable";
const usersData: User[] = [
	{
	  id: "1",
	  name: "Jean Pierre",
	  email: "jean@example.com",
	  role: "buyer",
	  updatedAt: "2025-09-22T15:00:00Z",
	},
	{
	  id: "2",
	  name: "Caleb",
	  email: "caleb@example.com",
	  role: "vendor",
	  updatedAt: "2025-09-21T15:00:00Z",
	},
  ];
const Users = () => {
  return <SellerTable users={usersData}/>;
};

export default Users;
