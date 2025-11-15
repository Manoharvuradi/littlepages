export default function OrderActions({
  orderId,
  orderNumber,
  status,
  trackingUrl
}: {
  orderId: string;
  orderNumber: string;
  status: string;
  trackingUrl?: string;
}) {
  const handleDownloadInvoice = () => {
    // Implement invoice download logic
    window.open(`/api/orders/${orderId}/invoice`, '_blank');
  };

  const handleTrackPackage = () => {
    if (trackingUrl) {
      window.open(trackingUrl, '_blank');
    }
  };

  const handleContactSupport = () => {
    // Navigate to support or open chat
    window.location.href = `/support?order=${orderNumber}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-3">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
      
      {trackingUrl && status === 'shipped' && (
        <button
          onClick={handleTrackPackage}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Track Package
        </button>
      )}
      
      <button
        onClick={handleDownloadInvoice}
        className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Invoice
      </button>
      
      <button
        onClick={handleContactSupport}
        className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Contact Support
      </button>
      
      {status === 'confirmed' && (
        <button
          className="w-full bg-red-50 text-red-600 py-3 px-4 rounded-lg font-medium hover:bg-red-100 transition"
        >
          Cancel Order
        </button>
      )}
      
      <button
        onClick={() => window.location.href = '/'}
        className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}
