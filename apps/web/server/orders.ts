export const fetchAllOrders = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/fetchAllOrders/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
}