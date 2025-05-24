'use server';
const BASE_URL = process.env.BACKEND_URL;

export async function callExternalApi(endpoint: string, method: "get" | "post", data?: Record<string, string | number | { productId: string, quantity: number }[]>) {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(method === "post" ? { body: JSON.stringify(data) } : {})
    })

    return res.json()
}