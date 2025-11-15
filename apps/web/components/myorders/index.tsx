// app/orders/[orderId]/page.tsx
import { notFound } from 'next/navigation';
import OrderHeader from './OrderHeader';
import OrderStatus from './OrderStatus';
import OrderItems from './OrderItems';
import DeliveryInfo from './DeliveryInfo';
import OrderSummary from './OrderSummary';
import OrderActions from './OrderActions';
import { getOrderData } from '../../server/book';
import { useEffect } from 'react';

// This would typically come from your API/database

export default function OrderViewPage() {
//   const order = await getOrderData(params.orderId);
  // useEffect(()=>{
  //   const order =  getOrderData('1');
  // })
  
  // if (!order) {
  //   notFound();
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h1 className="text-2xl font-bold text-green-900">Order Confirmed!</h1>
              <p className="text-green-700 mt-1">
                Thank you for your purchase. A confirmation email has been sent to {"manohar@gmail.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Header */}
        <OrderHeader 
          // orderNumber={order.orderNumber}
          // orderDate={order.createdAt}
          // estimatedDelivery={order.estimatedDelivery}
          orderNumber={"123456"}
          orderDate={"2023-09-01"}
          estimatedDelivery={"2023-09-05"}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <OrderStatus 
              // status={order.status}
              // trackingNumber={order.trackingNumber}
              // statusHistory={order.statusHistory}
              status={"Shipped"}
              trackingNumber={"123456789"}
              statusHistory={[]}
            />

            {/* Order Items */}
            <OrderItems 
              // items={order.items} 
              items={[]} 
            />

            {/* Delivery Information */}
            <DeliveryInfo 
              // shippingAddress={order.shippingAddress}
              // billingAddress={order.billingAddress}
              // shippingMethod={order.shippingMethod}
               shippingAddress={"123 Main St, Anytown, USA"}
              billingAddress={"123 Main St, Anytown, USA"}
              shippingMethod={"Standard Shipping"}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <OrderSummary 
              // subtotal={order.subtotal}
              // shipping={order.shipping}
              // tax={order.tax}
              // discount={order.discount}
              // total={order.total}
              // paymentMethod={order.paymentMethod}
              subtotal={2}
              shipping={0}
              tax={0}
              discount={0}
              total={2}
              paymentMethod={{ type: 'Credit Card', last4: '1234' }}
            />

            {/* Action Buttons */}
            <OrderActions 
              // orderId={order.id}
              // orderNumber={order.orderNumber}
              // status={order.status}
              // trackingUrl={order.trackingUrl}
              orderId={"1"}
              orderNumber={"123456"}
              status={"Shipped"}
              trackingUrl={"https://example.com/tracking"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}