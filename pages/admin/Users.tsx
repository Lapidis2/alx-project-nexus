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
	{
	  id: "3",
	  name: "Samantha Lee",
	  email: "samantha@example.com",
	  role: "buyer",
	  updatedAt: "2025-09-20T12:00:00Z",
	},
	{
	  id: "4",
	  name: "Marcus Wright",
	  email: "marcus@example.com",
	  role: "vendor",
	  updatedAt: "2025-09-19T18:30:00Z",
	},
	{
	  id: "5",
	  name: "Aisha Khan",
	  email: "aisha@example.com",
	  role: "buyer",
	  updatedAt: "2025-09-18T09:45:00Z",
	},
	{
	  id: "6",
	  name: "Liam Smith",
	  email: "liam@example.com",
	  role: "vendor",
	  updatedAt: "2025-09-17T22:10:00Z",
	},
	{
	  id: "7",
	  name: "Natalie Brown",
	  email: "natalie@example.com",
	  role: "buyer",
	  updatedAt: "2025-09-16T13:25:00Z",
	},
	{
	  id: "8",
	  name: "Diego Ramirez",
	  email: "diego@example.com",
	  role: "vendor",
	  updatedAt: "2025-09-15T17:00:00Z",
	},
	{
	  id: "9",
	  name: "Emily Zhang",
	  email: "emily@example.com",
	  role: "buyer",
	  updatedAt: "2025-09-14T11:40:00Z",
	},
	{
	  id: "10",
	  name: "Omar Yusuf",
	  email: "omar@example.com",
	  role: "vendor",
	  updatedAt: "2025-09-13T10:00:00Z",
	}
  ];
  
const Users = () => {
  return (
<div className="mt-20">  <SellerTable users={usersData}/>;
</div>
  )
};

export default Users;
