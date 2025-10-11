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