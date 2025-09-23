export const addImage = async (url: string, filename: string, userId: number) => {
  console.log("userId in addImage:", userId);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ url, filename }),
  });
  return res.json();
};

export const getMyImages = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/my`, {
    credentials: 'include',
  });
  return res.json();
};