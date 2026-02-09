'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchOrder, updateOrderStatus } from '../../../../lib/admin/api';
import { Order, OrderStatus } from '../../../../utils/admin';
import StatusBadge from '../../../../components/admin/StatusBadge';

const DETAIL_TABS = [
  { id: 'details', label: 'Order Details' },
  { id: 'items', label: 'Items' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'history', label: 'Status History' },
];

const STATUS_OPTIONS: OrderStatus[] = [
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
];

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>('CONFIRMED');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [params.id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await fetchOrder(params.id as string);
      setOrder(data);
      setNewStatus(data.status);
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      setUpdating(true);
      await updateOrderStatus(params.id as string, newStatus, statusNote);
      await loadOrder();
      setShowStatusModal(false);
      setStatusNote('');
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
    }
  };

  console.log("order", order);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Print Invoice
              </button>
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {DETAIL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.productName}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₹{item.price.toFixed(2) || "0"}</p>
                      <p className="text-xs text-gray-500">₹{item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Shipping Method</p>
                  <p className="text-sm text-gray-900">{order.shippingMethod}</p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tracking Number</p>
                    {order.trackingUrl ? (
                      <a
                        href={order.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {order.trackingNumber}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-900">{order.trackingNumber}</p>
                    )}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-700">Estimated Delivery</p>
                  <p className="text-sm text-gray-900">
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Shipping Address</p>
                  <p className="text-sm text-gray-900">
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status History</h2>
              <div className="space-y-4">
                {order.statusHistory.map((history: any) => (
                  <div key={history.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <StatusBadge status={history.status} />
                        <span className="text-xs text-gray-500">
                          {new Date(history.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {history.note && (
                        <p className="text-sm text-gray-600 mt-1">{history.note}</p>
                      )}
                      {history.createdBy && (
                        <p className="text-xs text-gray-500 mt-1">by {history.createdBy}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">₹{order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{order.tax.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-₹{order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-base font-semibold text-gray-900">₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all orders
                </button>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment</h2>
              <div className="space-y-3">
                {order.payments.map((payment: any) => (
                  <div key={payment.id}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Method</p>
                        <p className="text-sm text-gray-900">{payment.method}</p>
                      </div>
                      <StatusBadge status={payment.status as any} />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Amount</p>
                      <p className="text-sm text-gray-900">₹{payment.amount.toFixed(2)}</p>
                    </div>
                    {payment.transactionId && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Transaction ID</p>
                        <p className="text-sm text-gray-500 font-mono">{payment.transactionId}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
              <StatusBadge status={order.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Update Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (Optional)
                </label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a note about this status change..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={updating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}