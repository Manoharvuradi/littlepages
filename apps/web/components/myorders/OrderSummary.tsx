export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  paymentMethod
}: {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: { type: string; last4?: string };
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">{tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between text-lg font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">{total.toFixed(2)}</span>
        </div>
      </div>

      {/* <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>
            {paymentMethod.type}
            {paymentMethod.last4 && ` ending in ${paymentMethod.last4}`}
          </span>
        </div>
      </div> */}
    </div>
  );
}