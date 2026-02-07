'use client';

import OrderHeader from './OrderHeader';
import OrderStatus from './OrderStatus';
import OrderItems from './OrderItems';
import DeliveryInfo from './DeliveryInfo';
import OrderSummary from './OrderSummary';
import OrderActions from './OrderActions';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../server/user';
import { fetchAllOrders } from '../../server/orders';

type Address = {
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
};

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  email: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingMethod: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery: string;
  createdAt: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: any[];
};

export default function OrderViewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        
        const ordersData = await fetchAllOrders(user?.sub);
        
        if (Array.isArray(ordersData) && ordersData.length > 0) {
          setOrders(ordersData);
          // Set the most recent order as selected by default
          setSelectedOrder(ordersData[0]);
        } else {
          setError('No orders found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">{error || 'No orders found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Order Selector - if multiple orders */}
        {orders.length > 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Order
            </label>
            <select
              value={selectedOrder.id}
              onChange={(e) => {
                const order = orders.find(o => o.id === e.target.value);
                if (order) setSelectedOrder(order);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.orderNumber} - {new Date(order.createdAt).toLocaleDateString()} - ${order.total.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h1 className="text-2xl font-bold text-green-900">Order Confirmed!</h1>
              <p className="text-green-700 mt-1">
                Thank you for your purchase. A confirmation email has been sent to {selectedOrder.email}
              </p>
            </div>
          </div>
        </div>

        {/* Order Header */}
        <OrderHeader 
          orderNumber={selectedOrder.orderNumber}
          orderDate={selectedOrder.createdAt}
          estimatedDelivery={selectedOrder.estimatedDelivery}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <OrderStatus 
              status={selectedOrder.status}
              trackingNumber={selectedOrder.trackingNumber}
            />

            <OrderItems 
              items={selectedOrder.items || []} 
            />

            {/* Delivery Information */}
            <DeliveryInfo 
              shippingAddress={selectedOrder.shippingAddress}
              billingAddress={selectedOrder.billingAddress}
              shippingMethod={selectedOrder.shippingMethod}
            />
          </div>

          <div className="space-y-6">
            <OrderSummary 
              subtotal={selectedOrder.subtotal}
              shipping={selectedOrder.shipping}
              tax={selectedOrder.tax}
              discount={selectedOrder.discount}
              total={selectedOrder.total}
            />

            {/* <OrderActions 
              orderId={selectedOrder.id}
              orderNumber={selectedOrder.orderNumber}
              status={selectedOrder.status}
              trackingUrl={selectedOrder.trackingUrl}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}