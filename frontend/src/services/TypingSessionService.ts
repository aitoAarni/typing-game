import { API_URL } from "../config"
import { TypingSessionTotalSchema } from "../types/TypeGuards"
import { TypingSessionRemote } from "../types/types"

export const sendTypingSession = async (
    typingStatistics: TypingSessionRemote,
    token: string
) => {
    const url = API_URL + "/typing-session"
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(typingStatistics),
    })

    if (!result.ok) {
        throw new Error("Network error: " + result.statusText)
    }
}

export const getTypingSession = async (token: string) => {
    const url = API_URL + "/typing-session"
    const result = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    if (!result.ok) {
        throw new Error("Network error: " + result.statusText)
    }

    const data = await result.json()
    const typingSession = TypingSessionTotalSchema.parse(data.typingSessions)

    return typingSession
}
