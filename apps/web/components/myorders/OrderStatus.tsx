export default function OrderStatus({ 
  status, 
  trackingNumber,
  statusHistory 
}: {
  status: string;
  trackingNumber?: string;
  statusHistory?: Array<{ status: string; date: string; description: string }>;
}) {
  const statuses = [ 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered',];
  const currentIndex = statuses.findIndex(s => s.toLowerCase() === status.toLowerCase());

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          {statuses.map((s, index) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentIndex 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index < currentIndex ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <p className={`text-sm mt-2 ${
                index <= currentIndex ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}>
                {s}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div 
            className="h-full bg-green-600 transition-all duration-500"
            style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {trackingNumber && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Tracking Number</p>
          <p className="text-lg font-mono font-semibold text-blue-900">{trackingNumber}</p>
        </div>
      )}

      {/* Status History */}
      {statusHistory && statusHistory.length > 0 && (
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Status History</h3>
          <div className="space-y-3">
            {statusHistory.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{item.status}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}