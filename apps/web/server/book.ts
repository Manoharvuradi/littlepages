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

export const getBook = async (id: number, userId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/userbook/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};

export const getOrderData = async (orderId: string) => {
  // Replace with your actual API call
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
}

export const updateBookTitle = async (bookId: number, bookTitle: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/updateTitle/${bookId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookTitle }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update book title: ${err}`);
  }

  return res.json();
}

export const updateBookSize = async (bookId: number, bookSize: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/updateBookSize/${bookId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookSize }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update book size: ${err}`);
  }

  return res.json();
}

export const updateDisplaySettings = async (bookId: number, displaySettings: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/updateDisplaySettings/${bookId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ displaySettings }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update display settings: ${err}`);
  }

  return res.json();
}
