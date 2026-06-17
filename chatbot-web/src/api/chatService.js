import { ApiError } from "./apiError"
import { API_BASE_URL } from "../config"

/**
 * @param {string} message
 * @returns {Promise<{ message: string }>}
 */
export async function sendMessage(message) {
    const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
    })
    if (!res.ok) throw new ApiError(res.statusText, res.status)
    return res.json()
}
