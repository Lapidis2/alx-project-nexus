import React, { useState } from "react";
import SalesSummary from "@/components/sales/SalesSummary";
import TransactionsTable from "@/components/sales/TransactionsTable";

interface Transaction {
  id: string;
  orderId: string;
  productName: string;
  customerName: string;
  amount: number;
  status: "approved" | "pending_refund" | "refunded";
  date: string;
}

const SalesAnalysis: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    { id: "t1", orderId: "o1", productName: "Rolex Watch", customerName: "Eric", amount: 2500, status: "approved", date: "2025-09-25" },
    { id: "t2", orderId: "o2", productName: "iPhone 14", customerName: "Shema", amount: 1200, status: "pending_refund", date: "2025-09-24" },
    { id: "t3", orderId: "o3", productName: "Apple Watch", customerName: "Jean", amount: 800, status: "refunded", date: "2025-09-23" },
  ]);

  const approved = transactions.filter(t => t.status === "approved").length;
  const pending = transactions.filter(t => t.status === "pending_refund").length;
  const refunded = transactions.filter(t => t.status === "refunded").length;

  return (
    <div className="flex flex-col space-y-6 w-full mt-20">
      <h1 className="text-2xl font-bold">Sales Analysis</h1>

      <SalesSummary approved={approved} pending={pending} refunded={refunded} total={transactions.length} />

      <TransactionsTable title="Recent Transactions" transactions={transactions} />

      {pending > 0 && <TransactionsTable title="Pending Refund Requests" transactions={transactions.filter(t => t.status === "pending_refund")} showActions />}

      {refunded > 0 && <TransactionsTable title="Refunded Transactions" transactions={transactions.filter(t => t.status === "refunded")} />}
    </div>
  );
};

export default SalesAnalysis;
