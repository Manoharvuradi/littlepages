import { IFormAddress } from "../components/addressstep";

export const createAddress = async (address: IFormAddress) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/create`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(address),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to create address');
  }

  return res.json();
};
