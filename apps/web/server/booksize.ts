export const bookSizeInput = async (bookSize: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booksize/create`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(bookSize),
    });
    return res.json();
};