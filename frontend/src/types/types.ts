import { z } from "zod"
import { AuthResponseSchema, TypingSessionTotalSchema, WordDefinitionSchema } from "./TypeGuards"

export type WordDefinition = z.infer<typeof WordDefinitionSchema>

export type AuthResponse = z.infer<typeof AuthResponseSchema>

export type User = Omit<AuthResponse, "token">

export interface AuthContextType {
    user: User | null
    token: string | null
    setUser: (user: User | null) => void
    setToken: (token: string | null) => void
}
export interface ErrorContextType {
    errorMessage: string | null
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
}

export interface TypingContextType {
    typingEnabled: boolean
    setTypingEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export interface TypingStatistics {
    accuracy: number | string
    wpm: number
    time: number
    wordCount: number
    errorCount: number
    correctChars: number
    totalChars: number
}

export interface TypingSessionRemote {
    typed_text?: string
    total_characters: number
    correct_characters: number
    error_count: number
    word_count: number
    accuracy: number
    time_seconds: number
}

export type TypingSessionTotal = z.infer<typeof TypingSessionTotalSchema>