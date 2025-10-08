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