// // app/orders/[orderId]/page.tsx
// import { notFound } from 'next/navigation';
// import OrderHeader from './OrderHeader';
// import OrderStatus from './OrderStatus';
// import OrderItems from './OrderItems';
// import DeliveryInfo from './DeliveryInfo';
// import OrderSummary from './OrderSummary';
// import OrderActions from './OrderActions';
// import { getOrderData } from '../../server/book';
// import { useEffect, useState } from 'react';
// import { get } from 'http';
// import { getCurrentUser } from '../../server/user';
// import { fetchAllOrders } from '../../server/orders';

// // This would typically come from your API/database
// type Address = {
//   name: string;
//   street: string;
//   apartment?: string;
//   city: string;
//   state: string;
//   zip: string;
//   country: string;
//   phone?: string;
// };

// type Order = {
//   orderNumber: string;
//   status: string;
//   email: string;
//   subtotal: number;
//   shipping: number;
//   tax: number;
//   discount: number;
//   total: number;
//   shippingMethod: string;
//   trackingNumber?: string;
//   trackingUrl?: string;
//   estimatedDelivery: string;
//   createdAt: string;
//   shippingAddress: Address;
//   billingAddress: Address;
// };

// export default function OrderViewPage() {
//     const [order, setOrder] = useState<Order>({} as Order);
//     const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const user = await getCurrentUser();
//         console.log("User Data:", user);
//         const data = await fetchAllOrders(user?.sub); // Replace with actual orderId
//         setOrder(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, []);


//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Success Message */}
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
//           <div className="flex items-center">
//             <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//             <div>
//               <h1 className="text-2xl font-bold text-green-900">Order Confirmed!</h1>
//               <p className="text-green-700 mt-1">
//                 Thank you for your purchase. A confirmation email has been sent to {"manohar@gmail.com"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Order Header */}
//         <OrderHeader 
//           orderNumber={order.orderNumber}
//           orderDate={order.createdAt}
//           estimatedDelivery={order.estimatedDelivery}
//         />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             <OrderStatus 
//               status={order.status}
//               trackingNumber={order.trackingNumber}
//             />

//             <OrderItems 
//               items={[]} 
//             />

//             {/* Delivery Information */}
//             <DeliveryInfo 
//               shippingAddress={order.shippingAddress}
//               billingAddress={order.billingAddress}
//               shippingMethod={order.shippingMethod}
//             />
//           </div>

//           <div className="space-y-6">
//             <OrderSummary 
//               subtotal={order.subtotal}
//               shipping={order.shipping}
//               tax={order.tax}
//               discount={order.discount}
//               total={order.total}
//             />

//             <OrderActions 
//               // orderId={order.id}
//               orderNumber={order.orderNumber}
//               status={order.status}
//               trackingUrl={order.trackingUrl}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const OrderViewPage = () => {
  return (
    <div>
      OrderPageview
    </div>
  )
}

export default OrderViewPage
