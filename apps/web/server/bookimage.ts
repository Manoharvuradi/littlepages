import { UploadBookImageInput } from "@repo/types";

export const addImageToBook = async (req: 
    UploadBookImageInput
) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookimage/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });
    return res.json();
};

export const getBookImage = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookimage/get/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.json();
};

export const updatePageOrder = async (bookId: number, pages: { id: number; pageOrder: number }[]) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookimage/updateOrder`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, pages }),
    });
    return res.json();
}

export const updateBookImageDescription = async (id: number, data: Partial<UploadBookImageInput>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookimage/update/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return res.json();
};
