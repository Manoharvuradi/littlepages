import Image from 'next/image';

export default function OrderItems({ 
  items 
}: { 
  items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    variant?: string;
  }> 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
            <div className="relative w-20 h-20 flex-shrink-0">
              {item.image &&
                (<Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />)
              }
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              {item.variant && (
                <p className="text-sm text-gray-600">{item.variant}</p>
              )}
              <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}