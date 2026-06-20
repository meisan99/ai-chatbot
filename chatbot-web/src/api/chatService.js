import { ApiError } from "./apiError"
import { API_BASE_URL } from "../config"

/**
 * @param {string} message
 * @param {Array<{role: string, content: string}>} history
 * @returns {Promise<{ answer: string }>}
 */
export async function sendMessage(message, history = []) {
    const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
    })
    if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new ApiError(body?.detail ?? res.statusText, res.status)
    }
    return res.json()
}
