export default function OrderHeader({ 
  orderNumber, 
  orderDate, 
  estimatedDelivery 
}: {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm text-gray-600">Order Number</h2>
          <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
        </div>
        <div>
          <h2 className="text-sm text-gray-600">Order Date</h2>
          <p className="text-lg font-medium text-gray-900">
            {new Date(orderDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gray-600">Estimated Delivery</h2>
          <p className="text-lg font-medium text-green-600">
            {new Date(estimatedDelivery).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}