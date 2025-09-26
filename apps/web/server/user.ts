import { users } from "@repo/types";

export const signupUser = async(userData: users) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
}

export const loginUser = async(email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // <--- important!
        body: JSON.stringify({ email, password }),
    });
    let data;
    try {
        data = await response.json();
    } catch (e) {
        return { error: { message: "Invalid server response" } };
    }
    if (!response.ok) {
        return { error: data || { message: "Login failed" } };
    }
    return data;
}

export const getCurrentUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: 'include',
    });
    if (!res.ok) return null;
    return res.json();
}

export const signOut = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`, {
        credentials: 'include',
    });
    if (!res.ok) return null;
    return res.json();
}