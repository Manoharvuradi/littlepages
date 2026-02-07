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

// lib/address.ts

export async function fetchAddresses(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/address/get/${userId}`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch addresses (${res.status})`);
  }

  const text = await res.text();

  // ✅ Handle empty response safely
  if (!text) {
    return null; // or null, depending on your UI
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Invalid JSON from /address/get:", text);
    throw err;
  }
}

export async function updateAddress(id: string, data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update address");
  return res.json();
}

export async function deleteAddress(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete address");
}