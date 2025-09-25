interface Transaction {
	id: string;
	orderId: string;
	productName: string;
	customerName: string;
	amount: number;
	status: "approved" | "pending_refund" | "refunded";
	date: string;
  }
  
  interface TransactionsTableProps {
	title: string;
	transactions: Transaction[];
	showActions?: boolean;
  }
  
  const TransactionsTable: React.FC<TransactionsTableProps> = ({ title, transactions, showActions = false }) => (
	<div className="w-full bg-white p-4 rounded-lg shadow-sm overflow-auto">
	  <h2 className="text-lg font-semibold mb-3">{title}</h2>
	  <table className="w-full text-sm">
		<thead>
		  <tr className="bg-gray-100">
			<th className="p-2 text-left">Transaction ID</th>
			<th className="p-2 text-left">Customer</th>
			<th className="p-2 text-left">Product</th>
			<th className="p-2 text-left">Amount</th>
			<th className="p-2 text-left">Status</th>
			<th className="p-2 text-left">Date</th>
			{showActions && <th className="p-2 text-left">Actions</th>}
		  </tr>
		</thead>
		<tbody>
		  {transactions.map(t => (
			<tr key={t.id} className="border-t">
			  <td className="p-2">{t.id}</td>
			  <td className="p-2">{t.customerName}</td>
			  <td className="p-2">{t.productName}</td>
			  <td className="p-2">${t.amount}</td>
			  <td className="p-2 capitalize">{t.status.replace("_", " ")}</td>
			  <td className="p-2">{t.date}</td>
			  {showActions && t.status === "pending_refund" && (
				<td className="p-2 flex gap-2">
				  <button className="px-2 py-1 bg-green-500 text-white rounded">Approve</button>
				  <button className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
				</td>
			  )}
			</tr>
		  ))}
		</tbody>
	  </table>
	</div>
  );
  
  export default TransactionsTable;
  