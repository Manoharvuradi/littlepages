export const getUsers = async () => {
    const response = await fetch(`http://localhost:3001/auth/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}