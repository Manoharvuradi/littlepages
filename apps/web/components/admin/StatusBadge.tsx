import { OrderStatus, PaymentStatus } from "../../utils/admin";

const statusConfig: Record<PaymentStatus | OrderStatus, { bg: string; text: string }> = {
  CONFIRMED: { bg: 'bg-blue-100', text: 'text-blue-800' },
  PROCESSING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  SHIPPED: { bg: 'bg-purple-100', text: 'text-purple-800' },
  DELIVERED: { bg: 'bg-green-100', text: 'text-green-800' },
  CANCELLED: { bg: 'bg-red-100', text: 'text-red-800' },
  REFUNDED: { bg: 'bg-gray-100', text: 'text-gray-800' },
  PENDING: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  SUCCESS: { bg: 'bg-green-100', text: 'text-green-800' },
  FAILED: { bg: 'bg-red-100', text: 'text-red-800' },
};

export default function StatusBadge({ status }: { status: PaymentStatus | OrderStatus }) {
  const config = statusConfig[status];
  console.log("status", status);
  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
      {status}
    </span>
  );
}