export type OrderStatus = 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'REFUNDED'
  | 'PENDING';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
  imageUrl?: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  transactionId?: string;
  createdAt: Date;
}

export interface OrderStatusHistory {
  id: string;
  status: OrderStatus;
  note?: string;
  createdAt: Date;
  createdBy?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: number;
  email: string;
  customerName: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingMethod: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery: Date;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  payments: Payment[];
  statusHistory: OrderStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string; // Add this
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number; // Add this
  createdAt: Date;
  lastOrderDate?: Date; // Add this
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  recentOrders: Order[];
}