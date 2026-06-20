import { useState, useRef, useCallback } from "react"
import { sendMessage } from "../api/chatService"
import { ApiError } from "../api/apiError"

/**
 * @typedef {(message: string) => Promise<void>} sendMessageFunc
 */

/**
 * @returns {{ messages: Array<{text: string, isUser: boolean}>, loading: boolean, error: ApiError | null, sendMessage: sendMessageFunc }}
 */
export function useChat() {

    const [messages, setMessages] = useState([
        { text: "Hello, how can I help you?", isUser: false },
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Internal history for the backend
    /**
     * @type {React.MutableRefObject<Array<{role: string, content: string}>>}
     */
    const historyRef = useRef([])

    /** @type {sendMessageFunc} */
    const send = useCallback(async (message) => {

        setLoading(true)
        setError(null)

        try {

            setMessages((prev) => [...prev, { text: message, isUser: true }])

            const data = await sendMessage(message, historyRef.current)

            historyRef.current = [
                ...historyRef.current,
                { role: "user", content: message },
                { role: "model", content: data.answer },
            ]

            setMessages((prev) => [...prev, { text: data.answer, isUser: false }])

        } catch (err) {

            const apiError = err instanceof ApiError ? err : new ApiError("Unknown error", -1)
            setError(apiError)
            setMessages((prev) => [
                ...prev,
                { text: "An error occurred while sending the message.", isUser: false },
            ])

        } finally {
            setLoading(false)
        }
    }, [])

    return { messages, loading, error, sendMessage: send }
}
