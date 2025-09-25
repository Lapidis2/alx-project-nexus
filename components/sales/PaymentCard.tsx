interface PaymentCardProps {
	name: string;
	numbers: number;
  }
  
  const PaymentCard: React.FC<PaymentCardProps> = ({ name, numbers }) => (
	<div className="bg-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
	  <h3 className="text-gray-600 font-medium">{name}</h3>
	  <p className="text-2xl font-bold mt-2">{numbers}</p>
	</div>
  );
  
  export default PaymentCard;
  