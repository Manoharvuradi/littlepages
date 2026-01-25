import { Order } from "../../utils/admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchOrders(params?: {
  status?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.fromDate) queryParams.append('fromDate', params.fromDate);
  if (params?.toDate) queryParams.append('toDate', params.toDate);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const res = await fetch(`${API_URL}/admin/orders?${queryParams}`, {
    credentials: 'include',
  });
  
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function fetchOrder(id: string) {
  const res = await fetch(`${API_URL}/admin/orders/${id}`, {
    credentials: 'include',
  });
  
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
}

export async function updateOrderStatus(id: string, status: string, note?: string) {
  const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, note }),
  });
  
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
}

export async function updateOrder(id: string, data: Partial<Order>) {
  const res = await fetch(`${API_URL}/admin/orders/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) throw new Error('Failed to update order');
  return res.json();
}

export async function fetchCustomers(params?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const res = await fetch(`${API_URL}/auth/admin/customers?${queryParams}`, {
    credentials: 'include',
  });
  
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}

export async function fetchCustomer(id: number) {
  const res = await fetch(`${API_URL}/admin/customers/${id}`, {
    credentials: 'include',
  });
  
  if (!res.ok) throw new Error('Failed to fetch customer');
  return res.json();
}

export async function fetchDashboardStats() {
  const res = await fetch(`${API_URL}/admin/dashboard/stats`, {
    credentials: 'include',
  });
  
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
}

export async function exportOrders(params?: {
  status?: string;
  fromDate?: string;
  toDate?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.fromDate) queryParams.append('fromDate', params.fromDate);
  if (params?.toDate) queryParams.append('toDate', params.toDate);

  const res = await fetch(`${API_URL}/admin/orders/export?${queryParams}`, {
    credentials: 'include',
  });
  
  if (!res.ok) throw new Error('Failed to export orders');
  
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `orders-${new Date().toISOString()}.csv`;
  a.click();
}