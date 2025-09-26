import RequestsTable from "@/components/dashboard/RequestTable";
const mockSellers = [
	{
	  sellerId: "s1",
	  userId: "u1",
	  storeName: "FreshMart",
	  address: { city: "Kigali" },
	  TIN: "123456789",
	},
	{
	  sellerId: "s2",
	  userId: "u2",
	  storeName: "Green Foods",
	  address: { city: "Musanze" },
	  TIN: "987654321",
	},
	
  ];
const Requests =()=>{
	return(
		<div className="mt-0">	<RequestsTable sellers={mockSellers} />
</div>
	)
}
export default Requests