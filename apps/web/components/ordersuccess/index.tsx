
interface OrderSuccessProps {
    flowData: any;
    setFlowData: (data: any) => void;
    onBack: () => void;
}

export default function OrderSuccess({ flowData, setFlowData, onBack }: OrderSuccessProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-10">

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <div className="w-10 h-10 bg-green-500 rounded-full"></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Order Confirmed!
          </h1>

          <p className="text-gray-600 mt-3 leading-relaxed">
            Thank you for your purchase! Your order has been successfully placed.  
            We’re now preparing your book with love ✨
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Order Number */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Order Number
          </h2>

          <p className="text-gray-900 font-mono bg-gray-100 px-4 py-2 rounded-lg">
            {flowData?.orderNumber}
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Payment Details
          </h2>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Status:</span> {flowData?.payment?.status}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Amount:</span> ₹{flowData?.total}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Payment ID:</span> {flowData?.payment.paymentId}
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Shipping Address
          </h2>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-700 leading-relaxed">
            <p className="font-medium text-gray-900">{flowData?.address?.name}</p>
            <p>{flowData?.address?.street}</p>
            {flowData?.address?.apartment && <p>{flowData?.address?.apartment}</p>}
            <p>
              {flowData?.address?.city}, {flowData?.address?.state}{" "}
              {flowData?.address?.zip}
            </p>
            <p>{flowData?.address?.country}</p>
            {flowData?.address?.phone && (
              <p className="mt-1">Phone: {flowData?.address?.phone}</p>
            )}
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Estimated Delivery
          </h2>
          <p className="text-gray-900 font-medium">
            {/* {new Date(flowData?.estimatedDelivery).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} */}
            7 Workding days from now
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => (window.location.href = "/orders")}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => (window.location.href = "/book/create")}
            className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition"
          >
            Create Another Book
          </button>
        </div>

      </div>
    </div>
  );
}