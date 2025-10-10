import { IFormData } from "../utils";

export const bookInput = async (req: IFormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/create`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });
  return res.json();
};

export const getBook = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/get/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};