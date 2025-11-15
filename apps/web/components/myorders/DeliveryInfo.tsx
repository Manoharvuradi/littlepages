export default function DeliveryInfo({
  shippingAddress,
  billingAddress,
  shippingMethod
}: {
  shippingAddress: any;
  billingAddress: any;
  shippingMethod: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Shipping Address
          </h3>
          <div className="text-gray-600 space-y-1">
            <p className="font-medium text-gray-900">{shippingAddress.name}</p>
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
            <p>{shippingAddress.country}</p>
            {shippingAddress.phone && <p className="mt-2">Phone: {shippingAddress.phone}</p>}
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Billing Address
          </h3>
          <div className="text-gray-600 space-y-1">
            <p className="font-medium text-gray-900">{billingAddress.name}</p>
            <p>{billingAddress.street}</p>
            <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</p>
            <p>{billingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-2">Shipping Method</h3>
        <p className="text-gray-600">{shippingMethod}</p>
      </div>
    </div>
  );
}