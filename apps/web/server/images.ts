import { ImageUpdateInput } from "@repo/types";

export const addImage = async (url: string, filename: string, userId: number) => {
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
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

export const updateImageFormData = async (formData: ImageUpdateInput) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/update/${formData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(formData),
  });
  return res.json();
};