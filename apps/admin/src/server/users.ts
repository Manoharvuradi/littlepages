export const getUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}