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

export const replaceCoverImage = async (bookId: string, coverPhotoUrl: string | null) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/replaceCover/${bookId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coverPhotoUrl }),
    });
    return res.json();
}