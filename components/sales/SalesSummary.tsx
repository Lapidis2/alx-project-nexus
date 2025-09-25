import PaymentCard from "./PaymentCard";

interface SalesSummaryProps {
  approved: number;
  pending: number;
  refunded: number;
  total: number;
}

const SalesSummary: React.FC<SalesSummaryProps> = ({ approved, pending, refunded, total }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <PaymentCard name="Approved Payments" numbers={approved} />
    <PaymentCard name="Pending Refunds" numbers={pending} />
    <PaymentCard name="Refunded Transactions" numbers={refunded} />
    <PaymentCard name="Total Transactions" numbers={total} />
  </div>
);

export default SalesSummary;
